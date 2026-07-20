import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return a complex number when csch is called', () => {
    const complex = new Complex(1, 1);
    const csch = complex.csch();
    expect(csch).not.toBeNull();
    expect(csch).not.toBeUndefined();
  });
});