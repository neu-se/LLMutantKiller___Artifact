import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should handle acsch correctly', () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    expect(result.im).toBeCloseTo(-Infinity, 10);
  });
});