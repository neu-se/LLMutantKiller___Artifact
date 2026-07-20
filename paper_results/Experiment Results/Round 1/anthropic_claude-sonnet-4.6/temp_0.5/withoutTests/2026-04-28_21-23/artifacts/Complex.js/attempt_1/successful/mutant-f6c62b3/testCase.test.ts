import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex module exports", () => {
  it("should have __esModule property set to true on the Complex constructor", () => {
    const descriptor = Object.getOwnPropertyDescriptor(Complex, "__esModule");
    expect(descriptor).toBeDefined();
    expect(descriptor!.value).toBe(true);
  });
});