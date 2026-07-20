import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should return a value when csch is called on a complex number', () => {
    const complex = new Complex(1, 1);
    const csch = complex.csch();
    expect(csch).toBeDefined();
  });
});