import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when module is not an object', () => {
    if (typeof module!== 'object') {
      throw new Error('module is not an object');
    }
  });
});