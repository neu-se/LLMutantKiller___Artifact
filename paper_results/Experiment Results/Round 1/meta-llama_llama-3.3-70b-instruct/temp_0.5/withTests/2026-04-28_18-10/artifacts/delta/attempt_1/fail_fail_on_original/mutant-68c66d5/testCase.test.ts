import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when trying to require the Delta module in a non-object module context', () => {
    const originalModule = global.module;
    global.module = undefined;
    expect(() => {
      require('../../../../../../../../../../../subject_repositories/delta/src/Delta');
    }).toThrowError('Module is not an object');
    global.module = originalModule;
  });
});