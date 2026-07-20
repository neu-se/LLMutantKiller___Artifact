import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should only export module when it is an object', () => {
    const originalModule = global.module;
    global.module = undefined;
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
    expect(global.module).toBeUndefined();
    consoleSpy.mockRestore();
    global.module = originalModule;
  });
});