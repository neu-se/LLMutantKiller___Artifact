import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export as a module when module is an object', () => {
    const originalModule = global.module;
    global.module = { exports: {} };
    const DeltaModule = require('../../../../../../../../../../subject_repositories/delta/src/Delta');
    expect(DeltaModule).toBe(Delta);
    expect(DeltaModule.default).toBe(Delta);
    global.module = originalModule;
  });
});