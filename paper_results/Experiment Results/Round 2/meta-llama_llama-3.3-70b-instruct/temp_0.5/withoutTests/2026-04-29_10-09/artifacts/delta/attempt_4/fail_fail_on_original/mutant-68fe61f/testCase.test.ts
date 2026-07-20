import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta as both default and named export', () => {
    const originalModule = global.module;
    global.module = { exports: {} };
    const DeltaModule = require('../../../../../../../../../../subject_repositories/delta/src/Delta');
    expect(DeltaModule).toBeDefined();
    expect(DeltaModule.default).toBeDefined();
    expect(DeltaModule.default).toBe(DeltaModule);
    global.module = originalModule;
  });
});