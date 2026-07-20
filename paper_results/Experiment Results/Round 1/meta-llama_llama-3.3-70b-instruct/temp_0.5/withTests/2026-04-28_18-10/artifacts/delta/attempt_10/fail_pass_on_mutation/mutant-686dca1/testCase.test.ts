import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should check if module is an object before exporting Delta', () => {
    const originalModule = global.module;
    global.module = {};
    const delta = new Delta();
    expect(global.module).toBeInstanceOf(Object);
    global.module = originalModule;
  });
});