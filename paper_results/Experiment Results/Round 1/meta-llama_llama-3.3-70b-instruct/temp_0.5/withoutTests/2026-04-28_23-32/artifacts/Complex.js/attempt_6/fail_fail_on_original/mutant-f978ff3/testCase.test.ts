import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex csch', () => {
    const complex = new Complex(1, 0);
    const result = complex['csch']();
    expect(result['re']).toBeCloseTo(-0.8509181282393215, 10);
    expect(result['im']).toBeCloseTo(0, 10);
  });
});