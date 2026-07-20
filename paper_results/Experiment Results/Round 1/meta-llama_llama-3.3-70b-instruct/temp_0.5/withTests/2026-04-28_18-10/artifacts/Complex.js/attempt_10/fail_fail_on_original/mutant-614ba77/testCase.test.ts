const complexCode = `
/**
 * @license Complex.js v2.1.1 12/05/2020
 *
 * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

// ... rest of the complex.js code ...
`;

describe('Complex', () => {
  it('should have a default export', () => {
    expect(complexCode).toContain("Complex['default'] = Complex;");
    expect(complexCode).not.toContain("Complex[\"\"] = Complex;");
  });
});