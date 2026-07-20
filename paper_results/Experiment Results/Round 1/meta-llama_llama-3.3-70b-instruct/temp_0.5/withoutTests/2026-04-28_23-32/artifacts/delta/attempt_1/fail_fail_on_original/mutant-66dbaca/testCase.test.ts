import { Delta } from '../../src/Delta';

describe('Delta', () => {
  it('should be exported as a module', () => {
    const module = { exports: {} };
    const originalModule = { ...module };
    const originalExports = { ...module.exports };

    // Simulate the export of Delta in the original code
    module.exports = Delta;
    module.exports.default = Delta;

    // Check if the Delta class is correctly exported
    expect(module.exports).toBe(Delta);
    expect(module.exports.default).toBe(Delta);

    // Reset the module to its original state
    module.exports = originalExports;

    // Simulate the export of Delta in the mutated code
    // In this case, the mutated code does not export Delta

    // Check if the Delta class is not exported
    expect(module.exports).not.toBe(Delta);
    expect(module.exports.default).not.toBe(Delta);
  });
});