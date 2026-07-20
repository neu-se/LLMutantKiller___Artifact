import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should behave differently based on module type', () => {
    const originalModule = global.module;
    global.module = {};
    const delta1 = new Delta();
    global.module = { exports: {} };
    const delta2 = new Delta();
    expect(delta1).not.toBe(delta2);
    global.module = originalModule;
  });
});