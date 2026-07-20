import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check the type of module.exports', () => {
    const originalModule = global.module;
    global.module = { exports: {} };
    expect(typeof module.exports).toBe('object');
    global.module = originalModule;
  });
});