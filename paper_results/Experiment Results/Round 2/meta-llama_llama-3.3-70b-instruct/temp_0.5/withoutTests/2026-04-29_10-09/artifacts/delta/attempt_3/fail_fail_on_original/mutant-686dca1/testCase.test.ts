import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export correctly and have the correct module exports', () => {
    const module = require('module');
    const originalModule = require('../../../../../../../../../../subject_repositories/delta/src/Delta');
    expect(typeof module).toBe('object');
    expect(typeof originalModule).toBe('function');
  });
});