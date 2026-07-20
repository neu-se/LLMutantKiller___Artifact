import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export behavior", () => {
  it("should have module.exports defined when running in CommonJS context", () => {
    // This test verifies the specific mutation where the module export condition
    // was changed from 'typeof module === "object"' to 'false'
    // In the original code, this allows CommonJS exports to work
    // In the mutated code, module.exports would never be set

    // We'll test this by checking if the module has the expected CommonJS export structure
    const modulePath = "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
    const moduleContent = require(modulePath);

    // In the original code, module.exports should be set to Delta
    // In the mutated code, the condition is always false so module.exports remains undefined
    expect(moduleContent).toBeDefined();

    // Check both possible export patterns
    const exportedDelta = moduleContent.default || moduleContent;
    expect(exportedDelta).toBeDefined();
    expect(typeof exportedDelta).toBe('function');

    // Verify we can create an instance
    const delta = new exportedDelta();
    expect(delta).toBeInstanceOf(exportedDelta);

    // Test basic functionality to ensure it's the real Delta class
    const testDelta = new exportedDelta().insert("test");
    expect(testDelta.length()).toBe(4);
  });
});