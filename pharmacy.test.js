import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Standard drug", () => {
    it("should decrease the benefit and expiresIn", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug("test", 1, 2)]);
    });

    it("should decrease twice as fast once expired", () => {
      expect(
        new Pharmacy([new Drug("test", 0, 4)]).updateBenefitValue()
      ).toEqual([new Drug("test", -1, 2)]);

      expect(
        new Pharmacy([new Drug("test", -1, 8)]).updateBenefitValue()
      ).toEqual([new Drug("test", -2, 6)]);
    });

    it("should never have a negative benefit value", () => {
      expect(
        new Pharmacy([new Drug("test", 5, 0)]).updateBenefitValue()
      ).toEqual([new Drug("test", 4, 0)]);

      expect(
        new Pharmacy([new Drug("test", 0, 0)]).updateBenefitValue()
      ).toEqual([new Drug("test", -1, 0)]);
    });
  });

  describe("Herbal Tea", () => {
    it("should increase benefit as it gets older", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", 1, 4)]);
    });

    it("should increase benefit twice as fast once expired", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 3)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", -1, 5)]);
    });
  });

  describe("Magic Pill", () => {
    it("should never expire nor decrease in benefit", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug("Magic Pill", 2, 3)]);

      expect(
        new Pharmacy([new Drug("Magic Pill", 0, 3)]).updateBenefitValue()
      ).toEqual([new Drug("Magic Pill", 0, 3)]);
    });
  });

  describe("Fervex", () => {
    it("should increase benefit as it gets older (expiration > 10 days)", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 20, 3)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 19, 4)]);
    });

    it("should increase benefit x2 as it gets older (expiration <= 10 days && > 5 days)", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 10, 3)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 9, 5)]);

      expect(
        new Pharmacy([new Drug("Fervex", 8, 3)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 7, 5)]);
    });

    it("should increase benefit x3 as it gets older (expiration <= 5 days)", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 5, 3)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 4, 6)]);

      expect(
        new Pharmacy([new Drug("Fervex", 4, 3)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 3, 6)]);
    });

    it("should lose all benefit once expired", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 0, 30)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", -1, 0)]);
    });
  });

  describe("Dafalgan", () => {
    it("should decrease twice as fast", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 2, 4)]).updateBenefitValue()
      ).toEqual([new Drug("Dafalgan", 1, 2)]);

      expect(
        new Pharmacy([new Drug("Dafalgan", 0, 8)]).updateBenefitValue()
      ).toEqual([new Drug("Dafalgan", -1, 6)]);
    });
  });

  describe("All drugs", () => {
    it("should never have benefit value over 50", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 49)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", -1, 50)]);

      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 50)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", -1, 50)]);
    });
  });
});
