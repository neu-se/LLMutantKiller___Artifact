import { Complex } from '../complex';

describe('Complex', () => {
  it('should throw an error when multiplying with an invalid property', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    expect(() => c1.mul(c2["re"])).toThrowError();
  });
});