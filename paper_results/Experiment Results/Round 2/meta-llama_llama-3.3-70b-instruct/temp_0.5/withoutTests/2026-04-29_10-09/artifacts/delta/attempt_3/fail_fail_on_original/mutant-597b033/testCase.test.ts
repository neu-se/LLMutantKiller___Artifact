import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export as a module only when module is an object', () => {
    const originalModule = global.module;
    global.module = { exports: {} };
    const moduleExported = () => {
      require('../../../../../../../../../../subject_repositories/delta/src/Delta');
    };
    expect(moduleExported).not.toThrow();
    global.module = undefined;
    const moduleNotExported = () => {
      require('../../../../../../../../../../subject_repositories/delta/src/Delta');
    };
    expect(moduleNotExported).toThrow();
    global.module = originalModule;
  });
});