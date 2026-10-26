import "server-only";

const SANDBOX_BASE_URL = "https://sandbox.qikink.com";

type QikinkTokenResponse = {
  ClientId?: string | number;
  Accesstoken?: string;
  expires_in?: number | string;
  [key: string]: unknown;
};

export type QikinkOrderPayload = {
  order_number: string;
  qikink_shipping: 0 | 1;
  gateway: string;
  total_order_value: string | number;
  line_items: Array<{
    search_from_my_products: 0 | 1;
    price: string | number;
    quantity: string | number;
    sku: string;
    print_type_id?: number;
    designs?: Array<{
      design_code: string;
      width_inches?: number | string;
      height_inches?: number | string;
      placement_sku: string;
      design_link?: string;
      mockup_link?: string;
    }>;
  }>;
  shipping_address?: {
    first_name: string;
    last_name?: string;
    address1: string;
    address2?: string;
    phone: string;
    email: string;
    city: string;
    zip: string;
    province: string;
    country_code: string;
    country?: string;
    name?: string;
  };
};

export class QikinkApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "QikinkApiError";
  }
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new QikinkApiError(`Missing server environment variable: ${name}`);
  return value;
}

function assertSandboxOnly() {
  // Deliberately sandbox-only until the storefront, payments, order persistence,
  // SKU mapping and live approval have all been tested and reviewed.
  if (process.env.QIKINK_ENV !== "sandbox") {
    throw new QikinkApiError("Qikink integration is locked to Sandbox. Set QIKINK_ENV=sandbox.");
  }
}

async function readJson<T>(response: Response): Promise<T> {
  const body = await response.text();
  let parsed: unknown;
  try {
    parsed = body ? JSON.parse(body) : {};
  } catch {
    throw new QikinkApiError("Qikink returned an unreadable response.", response.status);
  }

  if (!response.ok) {
    // Avoid echoing request headers, credentials or raw upstream responses.
    throw new QikinkApiError(`Qikink request failed (HTTP ${response.status}). Check the API settings and request fields.`, response.status);
  }
  return parsed as T;
}

/** Requests a fresh token from the Sandbox API. Never call this from client components. */
export async function getQikinkSandboxToken(): Promise<{ token: string; expiresIn?: number }> {
  assertSandboxOnly();
  const clientId = requiredEnv("QIKINK_CLIENT_ID");
  const clientSecret = requiredEnv("QIKINK_CLIENT_SECRET");
  const form = new URLSearchParams({
    ClientId: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(`${SANDBOX_BASE_URL}/api/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
    cache: "no-store",
  });
  const data = await readJson<QikinkTokenResponse>(response);
  if (typeof data.Accesstoken !== "string" || !data.Accesstoken) {
    throw new QikinkApiError("Qikink authentication did not return an access token.");
  }

  const expires = Number(data.expires_in);
  return {
    token: data.Accesstoken,
    ...(Number.isFinite(expires) && expires > 0 ? { expiresIn: expires } : {}),
  };
}

/**
 * Creates an order only in Qikink Sandbox. This helper is not wired to public
 * checkout yet; a trusted server-side order workflow must validate payment,
 * persist the order and prevent duplicate submissions before calling it.
 */
export async function createQikinkSandboxOrder(payload: QikinkOrderPayload): Promise<unknown> {
  assertSandboxOnly();
  if (!payload.order_number || !/^[A-Za-z0-9]{1,15}$/.test(payload.order_number)) {
    throw new QikinkApiError("order_number must contain 1–15 letters or digits.");
  }
  if (!payload.line_items?.length) {
    throw new QikinkApiError("At least one line item is required.");
  }
  for (const item of payload.line_items) {
    if (!item.sku || !Number.isFinite(Number(item.quantity)) || Number(item.quantity) < 1) {
      throw new QikinkApiError("Each line item needs a SKU and a positive quantity.");
    }
  }

  const clientId = requiredEnv("QIKINK_CLIENT_ID");
  const { token } = await getQikinkSandboxToken();
  const response = await fetch(`${SANDBOX_BASE_URL}/api/order/create`, {
    method: "POST",
    headers: {
      ClientId: clientId,
      Accesstoken: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  return readJson<unknown>(response);
}
