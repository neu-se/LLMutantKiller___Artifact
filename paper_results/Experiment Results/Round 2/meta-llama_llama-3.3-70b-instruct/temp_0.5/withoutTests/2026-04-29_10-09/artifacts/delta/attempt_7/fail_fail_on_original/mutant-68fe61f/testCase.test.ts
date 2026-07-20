import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check the type of module when assigning a string', () => {
    const originalModule = global.module;
    global.module = "";
    expect(() => {
      // @ts-ignore
      module.exports = Delta;
    }).toThrowError();
    global.module = originalModule;
  });
});