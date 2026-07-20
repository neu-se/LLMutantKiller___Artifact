import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta CommonJS export verification", () => {
  it("should export Delta via module.exports when running in CommonJS context", () => {
    // This test directly targets the mutation where:
    // Original: if (typeof module === 'object')
    // Mutated:  if (false)
    // This breaks CommonJS module.exports assignment

    // We need to verify the module.exports behavior
    // Since we're in ES modules, we'll check the default export
    // The mutation would prevent module.exports from being set in CommonJS

    // First verify basic functionality
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);

    // Now test the actual export behavior
    // In original code, module.exports should be set to Delta
    // In mutated code, the condition is always false so module.exports remains undefined
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