import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return a value when asec is called on the original code', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result).toBeDefined();
  });
});