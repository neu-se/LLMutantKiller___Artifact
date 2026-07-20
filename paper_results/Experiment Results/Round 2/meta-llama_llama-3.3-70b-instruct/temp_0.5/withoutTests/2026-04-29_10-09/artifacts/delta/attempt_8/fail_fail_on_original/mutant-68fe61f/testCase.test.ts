import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check the type of module when assigning an object', () => {
    const originalModule = global.module;
    global.module = {};
    expect(() => {
      // @ts-ignore
      module.exports = Delta;
    }).not.toThrowError();
    expect(typeof module.exports).toBe('object');
    global.module = originalModule;
  });
});