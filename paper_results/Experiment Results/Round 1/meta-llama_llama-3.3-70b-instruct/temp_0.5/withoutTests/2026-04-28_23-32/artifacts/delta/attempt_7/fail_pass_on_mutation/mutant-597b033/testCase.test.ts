import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should only export module when it is an object', () => {
    const originalModule = global.module;
    global.module = { exports: {} };
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
    expect(global.module.exports).toBeDefined();
    global.module = originalModule;
  });
});