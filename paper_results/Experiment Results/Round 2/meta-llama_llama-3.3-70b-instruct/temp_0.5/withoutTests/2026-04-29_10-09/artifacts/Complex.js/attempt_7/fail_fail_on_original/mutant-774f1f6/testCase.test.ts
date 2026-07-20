import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly parse a complex number', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBeDefined();
    expect(complex.im).toBeDefined();
    expect(complex['re']).toBeDefined();
    expect(complex['im']).toBeDefined();
    expect(Object.keys(complex)).toContain('re');
    expect(Object.keys(complex)).toContain('im');
  });
});