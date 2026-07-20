import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate asinh correctly', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    expect(Object.keys(result)).toHaveLength(2);
  });
});