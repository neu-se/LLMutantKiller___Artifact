import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should have the correct ES module definition", () => {
    expect(Object.getOwnPropertyDescriptor(Complex, "__esModule")).toBeDefined();
    expect(Object.getOwnPropertyDescriptor(Complex, "__esModule").value).toBe(true);
  });
});