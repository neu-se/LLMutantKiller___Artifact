import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have a defined property "re" and "im" after calling atanh', () => {
    const complex = new Complex(1, 2);
    const result = complex.atanh();
    expect(Object.keys(result)).toContain('re');
    expect(Object.keys(result)).toContain('im');
  });
});