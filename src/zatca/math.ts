import Decimal from "decimal.js";

export class ZatcaMath {
  static truncate(value: Decimal.Value, decimals = 2): string {
    return new Decimal(value).toDecimalPlaces(decimals, Decimal.ROUND_DOWN).toFixed(decimals);
  }

  static truncateNumber(value: Decimal.Value, decimals = 2): number {
    return Number(ZatcaMath.truncate(value, decimals));
  }

  static monetary(value: Decimal.Value): string {
    return ZatcaMath.truncate(value, 2);
  }

  static monetaryNumber(value: Decimal.Value): number {
    return ZatcaMath.truncateNumber(value, 2);
  }

  static precise(value: Decimal.Value, decimals = 14): string {
    return ZatcaMath.truncate(value, decimals);
  }

  static calculateVATAmount(taxableAmount: Decimal.Value, vatRatePercent: Decimal.Value): number {
    return ZatcaMath.monetaryNumber(
      new Decimal(taxableAmount).mul(new Decimal(vatRatePercent).div(100))
    );
  }

  static calculateLineTotalWithVAT(lineNetAmount: Decimal.Value, lineVATAmount: Decimal.Value): number {
    return ZatcaMath.monetaryNumber(new Decimal(lineNetAmount).plus(lineVATAmount));
  }
}

export const truncate = ZatcaMath.truncate;
export const truncateNumber = ZatcaMath.truncateNumber;
export const formatMonetaryAmount = ZatcaMath.monetary;
export const calculateVATAmount = ZatcaMath.calculateVATAmount;
export const calculateLineTotalWithVAT = ZatcaMath.calculateLineTotalWithVAT;
