import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should throw an error when module is not an object', () => {
    // @ts-ignore
    const originalModule = global.module;
    // @ts-ignore
    global.module = "";
    expect(() => new Delta()).toThrowError('no handlers for embed type "module"');
    // @ts-ignore
    global.module = originalModule;
  });
});