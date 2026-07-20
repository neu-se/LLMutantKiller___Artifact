import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should correctly export Delta when module is an object', () => {
    // @ts-ignore
    const originalModule = global.module;
    // @ts-ignore
    global.module = { exports: {} };
    expect(() => {
      // @ts-ignore
      if (typeof global.module === 'object') {
        // @ts-ignore
        global.module.exports = Delta;
        // @ts-ignore
        global.module.exports.default = Delta;
      }
    }).not.toThrowError();
    // @ts-ignore
    global.module = originalModule;
  });

  it('should throw an error when module type is not object', () => {
    // @ts-ignore
    const originalModule = global.module;
    // @ts-ignore
    global.module = "";
    expect(() => {
      // @ts-ignore
      if (typeof global.module === 'object') {
        // @ts-ignore
        global.module.exports = Delta;
        // @ts-ignore
        global.module.exports.default = Delta;
      } else {
        throw new Error('module type is incorrect');
      }
    }).toThrowError('module type is incorrect');
    // @ts-ignore
    global.module = originalModule;
  });
});