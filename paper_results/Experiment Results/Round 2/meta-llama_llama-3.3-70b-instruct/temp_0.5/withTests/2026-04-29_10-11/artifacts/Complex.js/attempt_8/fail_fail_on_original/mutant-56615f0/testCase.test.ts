import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 0);
    expect(complex.acsch).toBeInstanceOf(Function);
  });
});