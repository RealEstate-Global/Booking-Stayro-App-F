# Stayro — Backend Service Specification

> Placeholder reserved for the Stayro API service. The frontend currently operates with client-side state and instant demo booking references (`STY-XXXXXX`).

## Planned Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express / NestJS REST API
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** JWT + Phone SMS OTP (Saudi national numbers +966)
- **Package Manager:** pnpm

## Service Responsibilities

- **Inventory & Pricing:** Live availability and dynamic rates for Saudi hotels and serviced stays.
- **Search & Filter:** Geospatial and amenity-based search engine across Saudi destinations.
- **Booking Engine:** Reservation transactions, calendar locking, and automated confirmation emails.
- **Payment Gateway:** Integration with Saudi payment rails (mada, Apple Pay, Visa, Mastercard) via HyperPay/Tap/Geidea.
- **Support & Ticketing:** Inquiries processing connected to `support@stayro.com`.

## Conventions

- Standalone pnpm service
- Run scripts: `pnpm dev` · `pnpm build` · `pnpm start` · `pnpm lint`
- Secrets managed via `.env` (with `.env.example` committed)
