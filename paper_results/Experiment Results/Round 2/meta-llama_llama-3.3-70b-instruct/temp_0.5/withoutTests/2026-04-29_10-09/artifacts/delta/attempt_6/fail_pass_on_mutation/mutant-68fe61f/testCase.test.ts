import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check the type of module', () => {
    const originalModule = global.module;
    global.module = {};
    expect(typeof global.module).toBe('object');
    global.module = originalModule;
  });
});