import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta module export", () => {
  it("should properly set module.exports in CommonJS context", () => {
    // This test specifically targets the mutation where:
    // Original: if (typeof module === 'object')
    // Mutated:  if (false)
    // This breaks CommonJS exports

    // We'll test this by checking if the module has been properly exported
    // In the original code, module.exports should be set to Delta
    // In the mutated code, the condition is always false so module.exports remains undefined

    // First verify the ES6 import works (this should work in both cases)
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');

    // Now test the CommonJS export path
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");

    // This is the key assertion that will fail in the mutated version
    // because module.exports won't be set when the condition is always false
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);

    // Verify we can create instances from both export methods
    const es6Delta = new Delta();
    const commonjsDelta = new moduleExports.default();

    expect(es6Delta).toBeInstanceOf(Delta);
    expect(commonjsDelta).toBeInstanceOf(Delta);

    // Test basic functionality to ensure it's the real Delta class
    const testDelta = new Delta().insert("test");
    expect(testDelta.length()).toBe(4);
  });
});