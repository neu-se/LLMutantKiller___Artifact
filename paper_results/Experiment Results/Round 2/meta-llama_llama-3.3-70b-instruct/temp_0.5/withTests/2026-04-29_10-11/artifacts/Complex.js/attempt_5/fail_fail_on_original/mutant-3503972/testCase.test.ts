import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the complex acsch correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.im).toBeCloseTo(-0.48121182505960347, 5);
  });
});