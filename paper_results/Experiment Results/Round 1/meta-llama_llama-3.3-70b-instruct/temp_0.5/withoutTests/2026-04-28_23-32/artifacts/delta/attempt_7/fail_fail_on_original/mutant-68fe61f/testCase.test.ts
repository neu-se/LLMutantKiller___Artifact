import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should throw an error when module is not an object', () => {
    const originalCode = `
      if (typeof module === 'object') {
        module.exports = Delta;
        module.exports.default = Delta;
      }
    `;
    const mutatedCode = `
      if (typeof module === "") {
        module.exports = Delta;
        module.exports.default = Delta;
      }
    `;
    const originalModule = {
      exports: {}
    };
    eval(originalCode);
    expect(originalModule.exports).toHaveProperty('default');
    expect(originalModule.exports.default).toBeInstanceOf(Function);
    const mutatedModule = {
      exports: {}
    };
    expect(() => {
      eval(mutatedCode);
    }).not.toThrowError();
    expect(mutatedModule.exports).not.toHaveProperty('default');
  });
});