const DRUG_MAGIC_PILL = "Magic Pill";
const DRUG_HERBAL_TEA = "Herbal Tea";
const DRUG_FERVEX = "Fervex";
const DRUG_DAFALGAN = "Dafalgan";
const MIN_BENEFIT = 0;
const MAX_BENEFIT = 50;

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  get isExpired() {
    return this.expiresIn < 0;
  }

  get canExpire() {
    return this.name !== DRUG_MAGIC_PILL;
  }

  get canLoseBenefit() {
    return this.name !== DRUG_MAGIC_PILL;
  }

  get getsBetterWithTime() {
    return this.name === DRUG_HERBAL_TEA || this.name === DRUG_FERVEX;
  }

  get nextDiffBenefit() {
    if (this.getsBetterWithTime) {
      if (this.name === DRUG_FERVEX) {
        if (this.expiresIn < 0) return -MAX_BENEFIT;
        if (this.expiresIn <= 5) return 3;
        if (this.expiresIn <= 10) return 2;
        return 1;
      }

      if (this.isExpired) return 2;
      return 1;
    }

    if (this.name === DRUG_DAFALGAN) {
      return -2;
    }

    if (this.isExpired) return -2;
    return -1;
  }

  updateBenefit() {
    if (this.canExpire) {
      this.expiresIn--;
    }

    if (this.canLoseBenefit) {
      this.benefit += this.nextDiffBenefit;

      // Benefit can never be negative
      this.benefit = Math.max(this.benefit, MIN_BENEFIT);

      // Benefit can't go over 50
      this.benefit = Math.min(this.benefit, MAX_BENEFIT);
    }
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs.forEach(drug => drug.updateBenefit());
    return this.drugs;
  }
}
