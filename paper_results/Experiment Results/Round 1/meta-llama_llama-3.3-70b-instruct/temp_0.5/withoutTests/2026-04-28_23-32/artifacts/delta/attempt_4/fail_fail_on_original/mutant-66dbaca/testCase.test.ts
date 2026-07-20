import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should be able to require Delta as a module', () => {
    const module = require('../../../../../../../../../subject_repositories/delta/src/Delta');
    expect(module.default).toBeDefined();
    expect(module).toBeDefined();
  });
});