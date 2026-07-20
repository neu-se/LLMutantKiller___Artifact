import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not throw an error when only one of real or imaginary parts is NaN', () => {
    expect(() => new Complex({ re: NaN, im: 1 })).not.toThrow();
    expect(() => new Complex({ re: 1, im: NaN })).not.toThrow();
    expect(new Complex({ re: NaN, im: 1 }).re).toBeNaN();
    expect(new Complex({ re: NaN, im: 1 }).im).toBe(1);
    expect(new Complex({ re: 1, im: NaN }).re).toBe(1);
    expect(new Complex({ re: 1, im: NaN }).im).toBeNaN();
  });
});