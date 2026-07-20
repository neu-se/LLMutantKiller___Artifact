import { Complex } from './complex';

describe('Complex', () => {
  it('should handle acoth correctly', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    expect(result.im).toBeLessThan(0);
  });
});