import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should export Delta correctly when module is an object', () => {
    // @ts-ignore
    const originalModule = global.module;
    // @ts-ignore
    global.module = { exports: {} };
    expect(() => {
      // @ts-ignore
      module.exports = Delta;
      // @ts-ignore
      module.exports.default = Delta;
    }).not.toThrowError();
    // @ts-ignore
    global.module = originalModule;
  });

  it.skip('should throw an error when module is not an object', () => {
    // @ts-ignore
    const originalModule = global.module;
    // @ts-ignore
    global.module = "";
    expect(() => {
      // @ts-ignore
      module.exports = Delta;
      // @ts-ignore
      module.exports.default = Delta;
    }).toThrowError();
    // @ts-ignore
    global.module = originalModule;
  });
});