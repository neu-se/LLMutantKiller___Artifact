import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should not throw an error when module is an object', () => {
    const originalModule = global.module;
    global.module = { foo: 'bar' };
    expect(() => {
      const delta = new Delta();
    }).not.toThrowError();
    global.module = originalModule;
  });

  it.skip('should throw an error when module is not an object in the mutated code', () => {
    const originalModule = global.module;
    global.module = { foo: 'bar' };
    // Simulate the mutated code
    const originalExport = Delta.default;
    Delta.default = undefined;
    expect(() => {
      const delta = new Delta();
    }).toThrowError();
    Delta.default = originalExport;
    global.module = originalModule;
  });
});