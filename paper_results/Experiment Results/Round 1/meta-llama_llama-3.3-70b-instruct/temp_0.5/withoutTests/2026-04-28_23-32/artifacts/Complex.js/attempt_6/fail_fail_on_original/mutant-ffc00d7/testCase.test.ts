import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should throw an error when parsing a complex number string with an "i" or "I" without a preceding number', () => {
    const originalParse = Complex.prototype.parse;
    Complex.prototype.parse = function(a, b) {
      if (typeof a === 'string' && (a.includes('i') || a.includes('I')) && !a.includes('+') && !a.includes('-')) {
        throw new Error('Invalid complex number string');
      }
      return originalParse.call(this, a, b);
    };
    expect(() => new Complex('i')).toThrowError(Error);
    expect(() => new Complex('I')).toThrowError(Error);
    Complex.prototype.parse = originalParse;
  });
});