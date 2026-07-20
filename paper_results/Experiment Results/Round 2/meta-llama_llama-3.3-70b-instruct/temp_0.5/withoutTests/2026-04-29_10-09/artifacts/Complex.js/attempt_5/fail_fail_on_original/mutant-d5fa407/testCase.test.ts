import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acot correctly for b !== 0 and detect mutation', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.im).not.toBe(0);
  });
});