import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle CommonJS module exports when module is an object', () => {
    const originalModule = global.module;
    global.module = { exports: {} };
    const DeltaModule = require('../../../../../../../../../../../subject_repositories/delta/src/Delta');
    expect(DeltaModule).toBeDefined();
    expect(DeltaModule.default).toBeDefined();
    global.module = originalModule;
    expect(() => {
      global.module = {};
      require('../../../../../../../../../../../subject_repositories/delta/src/Delta');
    }).toThrowError();
  });
});