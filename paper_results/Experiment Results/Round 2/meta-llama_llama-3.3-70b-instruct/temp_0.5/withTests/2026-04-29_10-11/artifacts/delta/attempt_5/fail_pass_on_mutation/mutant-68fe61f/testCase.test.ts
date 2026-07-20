import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should export Delta correctly when module is an object', () => {
    // @ts-ignore
    const originalModule = global.module;
    // @ts-ignore
    global.module = { exports: {} };
    const delta = new Delta();
    expect(delta).toBeDefined();
    // @ts-ignore
    global.module = originalModule;
  });

  it('should not throw an error when module is an object', () => {
    // @ts-ignore
    const originalModule = global.module;
    // @ts-ignore
    global.module = { exports: {} };
    expect(() => new Delta()).not.toThrowError();
    // @ts-ignore
    global.module = originalModule;
  });
});