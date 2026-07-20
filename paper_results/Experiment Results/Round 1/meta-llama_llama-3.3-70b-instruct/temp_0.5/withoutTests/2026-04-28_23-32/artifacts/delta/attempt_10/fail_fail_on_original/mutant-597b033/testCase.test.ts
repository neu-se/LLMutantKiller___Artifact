import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should only export module when it is an object', () => {
    const originalModule = global.module;
    global.module = undefined;
    expect(() => {
      const delta = new Delta();
    }).not.toThrowError();
    global.module = { exports: {} };
    expect(() => {
      const delta = new Delta();
    }).toThrowError();
    global.module = originalModule;
  });
});