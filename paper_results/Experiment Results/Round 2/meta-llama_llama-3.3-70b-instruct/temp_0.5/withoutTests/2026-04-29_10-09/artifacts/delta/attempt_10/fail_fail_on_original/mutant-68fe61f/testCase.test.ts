import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check the behavior of module.exports when module is not an object', () => {
    const originalModule = global.module;
    global.module = "";
    expect(() => {
      // @ts-ignore
      module.exports = Delta;
    }).toThrowError();
    global.module = originalModule;
  });
});