import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should create a new Delta instance when module is an object', () => {
    const originalModule = global.module;
    global.module = {};
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
    global.module = originalModule;
  });
});