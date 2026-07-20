import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when trying to access this[""] in the mul function', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 0);
    const spy = jest.spyOn(c1, 'mul');
    expect(() => c1.mul(c2)).not.toThrowError();
    spy.mockRestore();
    const c3 = new Complex(1, 2);
    const c4 = new Complex(3, 0);
    const result = c3.mul(c4);
    expect(result.re).toBe(3);
    expect(result.im).toBe(6);
  });
});