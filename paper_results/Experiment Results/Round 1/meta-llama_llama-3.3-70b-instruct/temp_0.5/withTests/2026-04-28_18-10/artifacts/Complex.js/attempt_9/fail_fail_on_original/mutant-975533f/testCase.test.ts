import { Complex } from '../../../complex';

describe('Complex', () => {
  it('should handle acoth correctly', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(-0.5493061443340548);
  });
});