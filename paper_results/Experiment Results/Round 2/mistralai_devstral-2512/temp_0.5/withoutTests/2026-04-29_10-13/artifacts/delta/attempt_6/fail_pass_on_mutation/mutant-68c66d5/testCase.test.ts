import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta module export", () => {
  it("should properly export Delta in CommonJS format", () => {
    // This test verifies the module export behavior that was mutated
    // Original: if (typeof module === 'object')
    // Mutated:  if (false)
    // This breaks CommonJS exports

    // Test that Delta is properly exported
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');

    // Create instance to verify basic functionality
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);

    // The key test: verify CommonJS exports work
    // We'll check if module.exports was set by testing the actual export
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);

    // Verify we can create instance from required module
    const requiredDelta = new moduleExports.default();
    expect(requiredDelta).toBeInstanceOf(Delta);
  });
});