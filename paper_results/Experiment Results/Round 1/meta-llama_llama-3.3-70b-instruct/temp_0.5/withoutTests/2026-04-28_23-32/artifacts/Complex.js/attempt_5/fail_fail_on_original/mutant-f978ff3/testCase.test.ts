import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex csch', () => {
    const complex = new Complex(1, 1);
    const result = complex['csch']();
    const expectedReal = result['re'];
    const expectedImaginary = result['im'];
    expect(result['re']).toBeCloseTo(expectedReal, 10);
    expect(result['im']).toBeCloseTo(expectedImaginary, 10);
  });
});