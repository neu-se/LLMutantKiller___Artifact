const vm = require('vm');

describe('Complex', () => {
  it('should define exports when using CommonJS', () => {
    const script = `
      const Complex = require('./complex.js');
      module.exports = Complex;
    `;
    const context = { module: { exports: {} }, require: require };
    vm.runInNewContext(script, context);
    expect(context.module.exports.__esModule).toBeDefined();
    expect(context.module.exports.default).toBeDefined();
    expect(context.module.exports.Complex).toBeDefined();
  });
});