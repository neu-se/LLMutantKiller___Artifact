import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should handle null tokens', () => {
    expect(() => new Complex('')).not.toThrow();
    expect(() => new Complex('a')).not.toThrow();
    expect(() => new Complex('1+2i')).not.toThrow();
    expect(() => new Complex('1-2i')).not.toThrow();
    expect(() => new Complex('1+2i3')).toThrow(SyntaxError);
  });
});