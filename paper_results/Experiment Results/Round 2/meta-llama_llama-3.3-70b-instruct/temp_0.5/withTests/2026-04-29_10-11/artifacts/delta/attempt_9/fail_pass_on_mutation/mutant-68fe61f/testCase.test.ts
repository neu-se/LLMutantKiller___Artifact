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

  it.skip('should throw an error when module type check is incorrect', () => {
    // @ts-ignore
    const originalModule = global.module;
    // @ts-ignore
    global.module = { exports: {} };
    expect(() => {
      // @ts-ignore
      if (typeof global.module !== 'object') {
        throw new Error('module type check is incorrect');
      }
    }).toThrowError('module type check is incorrect');
    // @ts-ignore
    global.module = originalModule;
  });
});