import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export correctly and have the correct module exports', () => {
    const originalModule = require('../../../../../../../../../../subject_repositories/delta/src/Delta');
    expect(originalModule).toHaveProperty('default');
    expect(originalModule.default).toBe(Delta);
    expect(originalModule).toBe(Delta);
  });
});