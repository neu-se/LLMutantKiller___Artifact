import { Complex } from './complex';

describe('Complex', () => {
  it('should have the im property defined after asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result.im).toBeDefined();
  });
});