# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows semantic versioning for published npm releases.

## [Unreleased]

### Added

- GitHub community health files for issues, pull requests, contributing, code
  of conduct, and security reporting

### Changed

- README community links and package metadata for open-source package polish
- Library metadata and licensing notes to better reflect current maintenance

## [0.1.11] - 2026-09-22

### Changed

- Document `LegalMonetaryTotal` writes `cbc:PayableRoundingAmount` for BT-114
- QR Tag 4 always uses `cbc:TaxInclusiveAmount` (BT-112)

## [0.1.10] - 2026-09-21

### Changed

- Monetary XML amounts use half-up rounding (ZATCA §10), not truncation
- Category VAT (`BT-117` / `BT-110`) is computed from the taxable total (BR-S-09)
- Optional `expected_payable` writes `BT-114` / `BT-115`; QR total uses payable when rounding is present

## [0.1.6] - 2026-06-30

### Added

- Published package baseline for `@pioneersoft/zatca-einvoice`
- ZATCA Phase 2 onboarding, XML generation, signing, QR, and API helper flows

### Notes

- This package is derived from `zatca-xml-js` and extended for broader Phase 2
  production API support and related workflow coverage.
