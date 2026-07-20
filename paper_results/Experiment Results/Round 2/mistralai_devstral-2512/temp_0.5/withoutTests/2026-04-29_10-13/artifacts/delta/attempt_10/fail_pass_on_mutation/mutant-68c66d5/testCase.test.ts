import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta module export behavior", () => {
  it("should export Delta via module.exports when module is defined", () => {
    // This test targets the specific mutation where:
    // Original: if (typeof module === 'object')
    // Mutated:  if (false)
    // This breaks CommonJS exports

    // We need to verify the module.exports behavior
    // The mutation would prevent module.exports from being set

    // First verify basic functionality
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);

    // Now test the actual export behavior
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");

    // This assertion will fail in the mutated version
    // because module.exports won't be set when the condition is always false
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);

    // Additional verification
    const requiredDelta = new moduleExports.default();
    expect(requiredDelta).toBeInstanceOf(Delta);
    expect(requiredDelta.insert("test").length()).toBe(4);
  });
});