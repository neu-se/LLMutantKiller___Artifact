import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should throw an error when module is not an object', () => {
    const originalModule = global.module;
    global.module = "";
    expect(() => {
      require('../../../../../../../../../../../subject_repositories/delta/src/Delta');
    }).toThrowError();
    global.module = originalModule;
  });
});