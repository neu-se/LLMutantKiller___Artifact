import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle module export when module is an object', () => {
    const originalModule = global.module;
    global.module = { exports: {} };
    const DeltaModule = require('../../../../../../../../../../../subject_repositories/delta/src/Delta');
    expect(DeltaModule).toBeDefined();
    expect(DeltaModule.default).toBeDefined();
    global.module = originalModule;
    const code = `
      if (typeof module === 'object') {
        module.exports = Delta;
        module.exports.default = Delta;
      } else {
        throw new Error('Module is not an object');
      }
    `;
    expect(() => eval(code)).not.toThrowError();
    global.module = originalModule;
    global.module = false;
    expect(() => eval(code.replace('if (typeof module === \'object\')', 'if (false)'))).toThrowError('Module is not an object');
    global.module = originalModule;
  });
});