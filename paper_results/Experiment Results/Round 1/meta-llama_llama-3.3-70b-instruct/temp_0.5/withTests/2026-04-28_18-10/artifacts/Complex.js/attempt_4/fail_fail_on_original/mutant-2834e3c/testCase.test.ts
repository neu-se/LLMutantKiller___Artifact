import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(1, 1);
    const result = complex.asech();
    expect(result).not.toBeNull();
  });
});