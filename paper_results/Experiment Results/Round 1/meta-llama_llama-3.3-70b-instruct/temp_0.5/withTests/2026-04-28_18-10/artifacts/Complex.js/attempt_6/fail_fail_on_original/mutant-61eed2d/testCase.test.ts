const complexCode = `
  /**
   * @license Complex.js v2.1.1 12/05/2020
   *
   * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
   * Dual licensed under the MIT or GPL Version 2 licenses.
   **/
  
  // ... rest of the complex.js code ...
`;

const Complex = eval(complexCode);

describe('Complex.js', () => {
  it('should correctly parse a complex number from a string', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});