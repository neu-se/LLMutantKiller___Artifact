import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate asinh correctly', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(Object.keys(result)).toEqual(['re', 'im']);
  });
});