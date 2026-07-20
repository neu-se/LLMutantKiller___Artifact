import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('subtracts two complex numbers correctly when one of them is infinite', () => {
    const c1 = new Complex('1+2i');
    const c2 = new Complex('Infinity');
    const result = c1.sub(c2);
    expect(result).toEqual(Complex['INFINITY']);
  });
});