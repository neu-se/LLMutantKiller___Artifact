import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex csch', () => {
    const complex = new Complex(1, 1);
    const result = complex['csch']();
    const expectedReal = -0.8686709614860096;
    const expectedImaginary = -0.6218263714738794;
    expect(result['re']).toBeCloseTo(expectedReal, 10);
    expect(result['im']).toBeCloseTo(expectedImaginary, 10);
  });
});