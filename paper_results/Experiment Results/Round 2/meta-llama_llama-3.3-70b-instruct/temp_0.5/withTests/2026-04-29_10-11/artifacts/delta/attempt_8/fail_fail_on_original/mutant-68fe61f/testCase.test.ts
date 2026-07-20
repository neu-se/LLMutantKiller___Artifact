import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should correctly export Delta when module is an object', () => {
    // @ts-ignore
    const originalModule = global.module;
    // @ts-ignore
    global.module = { exports: {} };
    const code = `
      if (typeof module === 'object') {
        module.exports = Delta;
        module.exports.default = Delta;
      } else {
        throw new Error('module is not an object');
      }
    `;
    expect(() => eval(code)).not.toThrowError();
    // @ts-ignore
    global.module = originalModule;
  });

  it('should throw an error when module is not an object', () => {
    // @ts-ignore
    const originalModule = global.module;
    // @ts-ignore
    global.module = "";
    const code = `
      if (typeof module === 'object') {
        module.exports = Delta;
        module.exports.default = Delta;
      } else {
        throw new Error('module is not an object');
      }
    `;
    expect(() => eval(code)).toThrowError('module is not an object');
    // @ts-ignore
    global.module = originalModule;
  });
});