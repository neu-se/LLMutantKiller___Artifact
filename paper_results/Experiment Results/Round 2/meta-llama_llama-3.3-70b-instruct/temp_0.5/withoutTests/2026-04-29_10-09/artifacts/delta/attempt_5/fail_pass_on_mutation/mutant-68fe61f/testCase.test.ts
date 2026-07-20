import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not throw an error when creating a new Delta instance', () => {
    const originalModule = global.module;
    global.module = {};
    expect(() => {
      new Delta();
    }).not.toThrowError();
    expect(typeof module.exports).toBe('object');
    global.module = originalModule;
  });
});