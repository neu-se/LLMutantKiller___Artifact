import { Complex } from '../complex';

describe('Complex', () => {
  it('should handle acoth correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const expected = new Complex(0.5493061443340548, -0.5493061443340548);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});