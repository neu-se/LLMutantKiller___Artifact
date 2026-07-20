import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not export as a module when module is not an object', () => {
    const originalModule = global.module;
    global.module = undefined;
    expect(() => {
      const moduleExported = require('../../../../../../../../../../subject_repositories/delta/src/Delta');
    }).toThrow();
    global.module = originalModule;
  });
});