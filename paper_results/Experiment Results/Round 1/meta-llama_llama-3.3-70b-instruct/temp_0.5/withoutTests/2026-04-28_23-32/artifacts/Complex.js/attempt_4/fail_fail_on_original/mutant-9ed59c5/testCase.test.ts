import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should have module.exports defined when using CommonJS', () => {
    const moduleExports = require('./complex.js');
    expect(moduleExports).toBeDefined();
    expect(moduleExports.__esModule).toBeDefined();
    expect(moduleExports.default).toBeDefined();
    expect(moduleExports.Complex).toBeDefined();
  });
});