import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should properly export Delta in CommonJS format", () => {
    // This test directly checks the module export behavior that was mutated
    // The mutation changes the condition from 'typeof module === "object"' to 'false'
    // This breaks the CommonJS export path

    // We need to test this in a way that would fail if module.exports isn't set
    // Since we're in an ES module context, we'll use a different approach

    // Create a delta instance to verify basic functionality
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);

    // The key test: verify that the module can be required in CommonJS
    // We'll use a dynamic import to simulate what would happen in CommonJS
    const modulePath = "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
    const moduleExports = require(modulePath);

    // In the original code, module.exports should be set to Delta
    // In the mutated code, the condition is always false so module.exports remains undefined
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);

    // Also check that we can create instances from the required module
    const requiredDelta = new moduleExports.default();
    expect(requiredDelta).toBeInstanceOf(Delta);
  });
});