import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta correctly', () => {
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
    const moduleExports = require('module').exports;
    expect(moduleExports).toBeDefined();
    expect(moduleExports.Delta).toBeDefined();
    expect(moduleExports.Delta).toBe(Delta);
  });
});