import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    expect(() => complex.asech()).not.toThrow();
  });
});