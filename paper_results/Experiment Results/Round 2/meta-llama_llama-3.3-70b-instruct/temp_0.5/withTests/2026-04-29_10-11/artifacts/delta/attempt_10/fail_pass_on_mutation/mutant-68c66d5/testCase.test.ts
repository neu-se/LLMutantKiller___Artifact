import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should check if typeof module is object', () => {
    if (typeof module !== 'object') {
      throw new Error('typeof module is not object');
    }
  });
});