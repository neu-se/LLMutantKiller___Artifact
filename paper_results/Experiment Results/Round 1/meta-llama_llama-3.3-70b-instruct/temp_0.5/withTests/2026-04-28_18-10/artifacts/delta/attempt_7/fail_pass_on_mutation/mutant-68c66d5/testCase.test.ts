import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should throw an error when module is not an object', () => {
    const originalModule = global.module;
    global.module = false;
    const code = `
      if (typeof module === 'object') {
        module.exports = Delta;
        module.exports.default = Delta;
      }
    `;
    expect(() => eval(code)).toThrowError();
    global.module = originalModule;
  });
});