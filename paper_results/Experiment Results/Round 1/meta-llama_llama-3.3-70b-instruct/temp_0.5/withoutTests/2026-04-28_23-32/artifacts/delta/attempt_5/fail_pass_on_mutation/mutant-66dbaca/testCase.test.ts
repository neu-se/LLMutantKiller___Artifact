import * as module from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should be able to import Delta as a module and check its exports', () => {
    expect(module).toBeDefined();
    expect(module.default).toBeDefined();
  });
});