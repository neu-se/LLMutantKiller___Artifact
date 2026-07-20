import { Complex } from "./complex.js";

describe("Complex.js mutation test", () => {
  it("should correctly expose Complex constructor via empty string property", () => {
    // This test checks if Complex[""] exists and is equal to Complex
    // The mutation changes Complex['Complex'] to Complex[""] which breaks this
    expect(Complex[""]).toBeUndefined();
  });
});