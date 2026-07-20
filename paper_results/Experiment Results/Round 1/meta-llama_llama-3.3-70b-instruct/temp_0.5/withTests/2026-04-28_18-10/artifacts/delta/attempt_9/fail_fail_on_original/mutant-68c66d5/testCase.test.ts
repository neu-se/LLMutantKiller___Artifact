import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle module export when module is an object', () => {
    const originalModule = global.module;
    global.module = { exports: {} };
    const code = `
      if (typeof module === 'object' && module!== null) {
        module.exports = Delta;
        module.exports.default = Delta;
      }
    `;
    expect(() => eval(code)).not.toThrowError();
    global.module = originalModule;
    global.module = false;
    expect(() => eval(code.replace('if (typeof module === \'object\' && module!== null)', 'if (false)'))).toThrowError();
    global.module = originalModule;
  });
});