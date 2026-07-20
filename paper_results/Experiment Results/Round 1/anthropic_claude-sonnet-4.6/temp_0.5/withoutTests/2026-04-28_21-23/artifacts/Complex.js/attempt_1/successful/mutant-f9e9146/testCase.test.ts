import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex __esModule property", () => {
  it("should have __esModule set to true", () => {
    const descriptor = Object.getOwnPropertyDescriptor(Complex, "__esModule");
    expect(descriptor).toBeDefined();
    expect(descriptor!.value).toBe(true);
  });
});