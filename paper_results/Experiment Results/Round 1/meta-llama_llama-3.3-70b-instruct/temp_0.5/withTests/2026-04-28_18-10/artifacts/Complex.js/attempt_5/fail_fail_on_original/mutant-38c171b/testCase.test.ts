import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.toString()).not.toContain('NaN');
  });
});