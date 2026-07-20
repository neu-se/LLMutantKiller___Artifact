import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(1, -1).acot();
    expect(resultOriginal.im).toBeLessThan(0);
  });
});