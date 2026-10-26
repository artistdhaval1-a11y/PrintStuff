# PrintStuff × Qikink integration

## Safety rules

- Work on the `feature/qikink-store` branch. Do not change `main` or production deployments during development.
- The first integration phase is Sandbox-only. `lib/qikink.ts` deliberately rejects any environment other than `QIKINK_ENV=sandbox`.
- Keep `QIKINK_CLIENT_SECRET` in server-side environment variables only. Never use a `NEXT_PUBLIC_` prefix, expose the token to the browser, or commit credentials.
- The current storefront uses local hard-coded product data, browser-only cart state and a WhatsApp quote flow. It does not yet have durable orders, verified payments, artwork storage or checkout authentication.
- Do not call Qikink's create-order endpoint directly from a browser or on every checkout retry. Persist orders and use an idempotent server-side order workflow first to avoid duplicate production orders.

## Current API details verified from Qikink documentation

- Sandbox base URL: `https://sandbox.qikink.com`
- Token: `POST /api/token`, `application/x-www-form-urlencoded`, fields `ClientId` and `client_secret`
- Order creation: `POST /api/order/create`, JSON body, headers `ClientId` and `Accesstoken`
- Order listing: `GET /api/order/list`, with `ClientId` and `Accesstoken` headers; the PDF documents filters such as `order_reference_no`, `status`, `id`, `ids`, `params`, and pagination.
- Legacy order lookup: `GET /api/order` is also documented.
- **Product sync limitation:** the supplied 21-page Qikink API PDF documents token generation, order creation, order listing, and order lookup. It does not document a product-catalogue/list endpoint, product-update webhook, or custom-store `Push to Store` endpoint. Therefore the requested automatic product sync cannot safely be implemented from this document alone. Do not invent an endpoint or treat the order API as a product API. Confirm with Qikink whether a separate product API/webhook or custom-store integration is available.

## Setup for a local sandbox test

1. Copy `.env.example` to `.env.local`.
2. Set `QIKINK_ENV=sandbox`, `QIKINK_CLIENT_ID`, and `QIKINK_CLIENT_SECRET` using the Sandbox credentials from Qikink Dashboard → Integration → Custom API.
3. Do not paste secrets into chat or commit `.env.local`.
4. The API client is server-only. It currently provides helpers but is intentionally not exposed through a public route.
5. Test token acquisition from a trusted server-side workflow before testing order creation. Do not use live credentials or create a real order during this phase.

## Remaining implementation

1. Ask Qikink support whether custom-built stores can receive product updates after clicking Push to Store, and request the product API/webhook specification if available.
2. Confirm exact Qikink SKU/product mapping for each size and colour; do not assume the storefront's display names are valid SKUs.
3. Add protected admin-only diagnostics for Sandbox authentication.
4. Add durable database models for carts/orders, customer details, payment state and Qikink IDs.
5. Add a payment gateway and verify payment server-side before forwarding prepaid orders to Qikink.
6. Store uploaded artwork in durable private/object storage and send Qikink a stable HTTPS design URL.
7. Implement idempotent order submission and order-status synchronisation.
8. Test in Sandbox, request Qikink Live API approval, configure Live credentials separately, then perform a reviewed release. No automatic production deployment is part of this branch.
