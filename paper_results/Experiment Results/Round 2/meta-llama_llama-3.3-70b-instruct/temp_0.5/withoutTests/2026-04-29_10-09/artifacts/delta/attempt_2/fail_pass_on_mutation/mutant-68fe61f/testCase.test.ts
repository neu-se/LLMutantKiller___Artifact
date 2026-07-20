import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not throw an error when module is an object', () => {
    const originalModule = global.module;
    global.module = {};
    expect(() => {
      new Delta();
    }).not.toThrowError();
    global.module = originalModule;
  });
});