import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should throw an error when module is not an object', () => {
    const originalModule = global.module;
    global.module = undefined;
    expect(() => {
      const delta = new Delta();
    }).toThrowError('module is not defined');
    global.module = originalModule;
  });
});