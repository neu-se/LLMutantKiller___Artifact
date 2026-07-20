const vm = require('vm');

describe('Complex', () => {
  it('should have a defined __esModule property with correct name', () => {
    const code = fs.readFileSync('./complex.js', 'utf8');
    const context = {};
    vm.runInNewContext(code, context);
    expect(Object.keys(context.Complex)).toContain('__esModule');
    expect(context.Complex.__esModule).toBe(true);
  });
});