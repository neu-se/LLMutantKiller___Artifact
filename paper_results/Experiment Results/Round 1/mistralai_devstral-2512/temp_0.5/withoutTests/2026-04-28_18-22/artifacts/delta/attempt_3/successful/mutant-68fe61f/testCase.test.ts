import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export behavior", () => {
  it("should properly export Delta in CommonJS environment", () => {
    // This test targets the module export logic that was mutated
    // The mutation changes the condition from checking if module is an object
    // to checking if it's an empty string, which would break CommonJS exports

    // We need to test the actual export behavior that depends on the module check
    // Since we can't directly test the module check itself, we test its side effects

    // The original code exports Delta both as default and as module.exports
    // The mutation would prevent this dual export behavior

    // Test that module.exports exists and contains Delta
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);
    expect(moduleExports).toBe(Delta);

    // Test that we can use both export styles
    const delta1 = new Delta();
    const delta2 = new moduleExports();
    expect(delta1).toBeInstanceOf(Delta);
    expect(delta2).toBeInstanceOf(Delta);
  });
});