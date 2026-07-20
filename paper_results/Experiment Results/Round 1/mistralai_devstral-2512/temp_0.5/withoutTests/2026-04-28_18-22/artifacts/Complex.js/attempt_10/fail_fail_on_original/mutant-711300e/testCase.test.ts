import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse object with only 'im' property when 're' is not present", () => {
    const c = new Complex({ im: 3 });
    expect(c.re).toBe(0);
    expect(c.im).toBe(3);
  });
});