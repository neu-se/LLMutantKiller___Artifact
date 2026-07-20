import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse object with both 're' and 'im' properties", () => {
    const c = new Complex({ re: 2, im: 3 });
    expect(c.re).toBe(2);
    expect(c.im).toBe(3);
  });
});