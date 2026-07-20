import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should be a function', () => {
    const originalModule = {
      exports: {}
    };
    const code = `
      if (typeof module === 'object') {
        module.exports = Delta;
        module.exports.default = Delta;
      }
    `;
    expect(() => eval(code)).not.toThrowError();
  });

  it('should throw an error when module is not an object', () => {
    const originalModule = {
      exports: {}
    };
    const code = `
      if (typeof module === "") {
        module.exports = Delta;
        module.exports.default = Delta;
      }
    `;
    expect(() => eval(code)).toThrowError();
  });
});