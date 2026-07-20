import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should check if module is not an empty string', () => {
    // @ts-ignore
    const originalModule = global.module;
    // @ts-ignore
    global.module = "";
    expect(() => new Delta()).not.toThrowError();
    // @ts-ignore
    global.module = {};
    const delta = new Delta();
    expect(delta).toBeDefined();
    // @ts-ignore
    global.module = originalModule;
  });
});