import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly handle objects with both "im" and "re" properties', () => {
    const c1 = new Complex({ im: 1, re: 2 });
    const c2 = new Complex({ im: 1 });
    const c3 = new Complex({ re: 1 });

    expect(c1.re).toBe(2);
    expect(c1.im).toBe(1);

    // The mutated code will not throw an error for c2 and c3, 
    // but the original code should throw an error
    expect(() => c2).toThrow(SyntaxError);
    expect(() => c3).toThrow(SyntaxError);
  });
});