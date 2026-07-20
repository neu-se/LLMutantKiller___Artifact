import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should create a new Delta instance and export it correctly', () => {
    const originalModule = global.module;
    global.module = {};
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
    expect(global.module.exports).toBe(delta);
    global.module = originalModule;
  });
});