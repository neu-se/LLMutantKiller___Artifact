import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should multiply two complex numbers correctly and handle the mutation', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(3);
    expect(result.im).toBe(6);

    // Test the mutation by checking if this[""] is not equal to 0
    expect(() => c1.mul({re: 3, im: 0})).not.toThrowError();
  });
});