import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly handle object with only 're' property and no 'im' property", () => {
    const c = new Complex({ re: 4.5 });
    expect(c.re).toBe(4.5);
    expect(c.im).toBe(0);
  });
});