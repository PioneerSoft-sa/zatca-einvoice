import Decimal from "decimal.js";

export class ZatcaMath {
  /** Keep high-precision unit prices / quantities; not for 2dp monetary fields. */
  static truncate(value: Decimal.Value, decimals = 2): string {
    return new Decimal(value).toDecimalPlaces(decimals, Decimal.ROUND_DOWN).toFixed(decimals);
  }

  static truncateNumber(value: Decimal.Value, decimals = 2): number {
    return Number(ZatcaMath.truncate(value, decimals));
  }

  /** ZATCA §10: half-up to 2 decimals (third digit ≥ 5 rounds up). */
  static monetary(value: Decimal.Value): string {
    return new Decimal(value).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2);
  }

  static monetaryNumber(value: Decimal.Value): number {
    return Number(ZatcaMath.monetary(value));
  }

  static precise(value: Decimal.Value, decimals = 14): string {
    return ZatcaMath.truncate(value, decimals);
  }

  static calculateVATAmount(taxableAmount: Decimal.Value, vatRatePercent: Decimal.Value): number {
    return ZatcaMath.monetaryNumber(
      new Decimal(taxableAmount).mul(new Decimal(vatRatePercent).div(100))
    );
  }

  /**
   * Sum already-rounded 2dp amounts with Decimal.plus (never JavaScript +).
   * `new Decimal(17.4 + 2.61)` is 20.0099… and would fail BR-KSA-51 / BR-CO-10 / BR-S-08.
   */
  static addMonetary(...values: Decimal.Value[]): string {
    const sum = values.reduce<Decimal>(
      (acc, value) => acc.plus(new Decimal(value)),
      new Decimal(0)
    );
    return sum.toFixed(2);
  }

  static calculateLineTotalWithVAT(lineNetAmount: Decimal.Value, lineVATAmount: Decimal.Value): number {
    return Number(ZatcaMath.addMonetary(lineNetAmount, lineVATAmount));
  }

  static hasExpectedPayable(value: number | null | undefined): value is number {
    return value !== undefined && value !== null && Number.isFinite(value);
  }
}

export const truncate = ZatcaMath.truncate;
export const truncateNumber = ZatcaMath.truncateNumber;
export const addMonetary = ZatcaMath.addMonetary;
export const calculateVATAmount = ZatcaMath.calculateVATAmount;
export const calculateLineTotalWithVAT = ZatcaMath.calculateLineTotalWithVAT;
export const hasExpectedPayable = ZatcaMath.hasExpectedPayable;
