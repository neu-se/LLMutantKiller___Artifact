import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle module export when module is an object', () => {
    const originalModule = global.module;
    global.module = { exports: {} };
    const code = `
      if (typeof module === 'object') {
        module.exports = Delta;
        module.exports.default = Delta;
      }
    `;
    expect(() => eval(code)).toThrowError();
    global.module = originalModule;
    global.module = { exports: {} };
    expect(() => eval(code)).not.toThrowError();
    global.module = originalModule;
  });
});