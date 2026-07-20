import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should only export module when it is an object', () => {
    const originalModule = global.module;
    global.module = undefined;
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
    expect(global.module).toBeUndefined();
    global.module = originalModule;
    expect(() => {
      global.module = {};
      const delta2 = new Delta();
    }).toThrowError('module.exports is not defined');
  });
});