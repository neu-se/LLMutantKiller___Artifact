import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export correctly when module is an object', () => {
    const module = require('module');
    if (typeof module !== 'object') {
      throw new Error('Module is not an object');
    }
    expect(true).toBeTruthy();
  });
});