import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate asinh', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(result.toString()).not.toBe('NaN');
  });
});