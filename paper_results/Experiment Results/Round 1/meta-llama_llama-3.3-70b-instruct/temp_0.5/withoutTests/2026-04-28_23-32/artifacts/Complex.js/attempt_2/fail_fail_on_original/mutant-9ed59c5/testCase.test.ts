import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should have a default export when using CommonJS', () => {
    const moduleExports = require('./complex.js');
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBeDefined();
    expect(moduleExports.Complex).toBeDefined();
  });
});