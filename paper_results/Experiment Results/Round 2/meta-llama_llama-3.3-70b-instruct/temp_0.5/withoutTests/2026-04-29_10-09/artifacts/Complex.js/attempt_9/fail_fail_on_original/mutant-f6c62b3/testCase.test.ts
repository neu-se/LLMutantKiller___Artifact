const vm = require('vm');
const fs = require('fs');

describe('Complex', () => {
  it('should have a defined __esModule property with correct name', () => {
    const code = fs.readFileSync('./complex.js', 'utf8');
    const context = { Complex: {} };
    vm.runInNewContext(code, context);
    expect(Object.keys(context)).toContain('Complex');
    expect(context.Complex.__esModule).toBe(true);
  });
});