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
- Order status/read APIs and any product-catalogue endpoints must be checked against the current Qikink Open API reference before they are wired into the UI.

## Setup for a local sandbox test

1. Copy `.env.example` to `.env.local`.
2. Set `QIKINK_ENV=sandbox`, `QIKINK_CLIENT_ID`, and `QIKINK_CLIENT_SECRET` using the Sandbox credentials from Qikink Dashboard → Integration → Custom API.
3. Do not paste secrets into chat or commit `.env.local`.
4. The API client is server-only. It currently provides helpers but is intentionally not exposed through a public route.
5. Test token acquisition from a trusted server-side workflow before testing order creation. Do not use live credentials or create a real order during this phase.

## Remaining implementation

1. Confirm exact Qikink SKU/product mapping for each size and colour; do not assume the storefront's display names are valid SKUs.
2. Add protected admin-only diagnostics for Sandbox authentication.
3. Add durable database models for carts/orders, customer details, payment state and Qikink IDs.
4. Add a payment gateway and verify payment server-side before forwarding prepaid orders to Qikink.
5. Store uploaded artwork in durable private/object storage and send Qikink a stable HTTPS design URL.
6. Implement idempotent order submission and order-status synchronisation.
7. Test in Sandbox, request Qikink Live API approval, configure Live credentials separately, then perform a reviewed release. No automatic production deployment is part of this branch.
