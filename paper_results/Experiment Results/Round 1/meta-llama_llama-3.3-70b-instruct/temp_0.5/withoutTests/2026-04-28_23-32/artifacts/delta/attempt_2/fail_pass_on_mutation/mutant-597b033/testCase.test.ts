import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not export module when it is not an object', () => {
    const originalModule = global.module;
    global.module = null;
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
    expect(global.module).toBe(null);
    global.module = originalModule;
  });
});