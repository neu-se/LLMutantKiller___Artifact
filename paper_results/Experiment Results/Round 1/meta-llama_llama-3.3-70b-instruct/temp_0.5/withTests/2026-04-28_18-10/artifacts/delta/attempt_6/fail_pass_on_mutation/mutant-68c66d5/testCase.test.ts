import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle CommonJS module exports when typeof module === "object"', () => {
    const originalModule = global.module;
    global.module = { exports: {} };
    expect(() => {
      require('../../../../../../../../../../../subject_repositories/delta/src/Delta');
    }).not.toThrowError();
    global.module = { exports: {} };
    global.module.exports = {};
    expect(() => {
      require('../../../../../../../../../../../subject_repositories/delta/src/Delta');
    }).not.toThrowError();
    global.module = originalModule;
  });
});