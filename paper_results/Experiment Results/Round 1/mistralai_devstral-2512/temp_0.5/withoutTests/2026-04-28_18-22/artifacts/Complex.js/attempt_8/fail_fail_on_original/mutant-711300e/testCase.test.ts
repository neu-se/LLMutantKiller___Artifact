import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse object with only 're' property when 'im' is not present", () => {
    const c = new Complex({ re: 5 });
    expect(c.re).toBe(5);
    expect(c.im).toBe(0);
  });
});