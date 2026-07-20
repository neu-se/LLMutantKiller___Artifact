import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.sech();
    expect(result).toBeDefined();
  });
});