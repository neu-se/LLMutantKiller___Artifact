import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not export as a module when module is not an object', () => {
    const originalModule = global.module;
    global.module = undefined;
    const moduleExported = () => {
      require('../../../../../../../../../../subject_repositories/delta/src/Delta');
    };
    expect(moduleExported).toThrow();
    global.module = originalModule;
  });
});