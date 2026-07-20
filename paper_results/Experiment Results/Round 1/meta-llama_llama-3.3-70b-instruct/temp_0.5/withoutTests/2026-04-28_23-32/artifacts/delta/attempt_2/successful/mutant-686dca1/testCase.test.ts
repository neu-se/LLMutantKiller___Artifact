import * as DeltaModule from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta as default and module.exports when module is an object', () => {
    const originalModule = globalThis.module;
    globalThis.module = {};
    expect(typeof DeltaModule.default).toBe('function');
    expect(DeltaModule.default.name).toBe('Delta');
    expect(DeltaModule).toBe(DeltaModule.default);
    globalThis.module = originalModule;
  });
});