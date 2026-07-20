import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should export Delta as both default and module.exports", () => {
    // This test verifies that Delta is properly exported in both CommonJS and ES module formats
    // The mutation changes the module export check from 'typeof module === 'object''
    // to 'typeof module !== 'object'', which would break the export behavior

    // Test that Delta is available as default export
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');

    // Test that Delta is also available via module.exports (CommonJS)
    // This would fail in the mutated version because the condition is inverted
    const commonJSExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    expect(commonJSExports).toBeDefined();
    expect(commonJSExports.default).toBe(Delta);
    expect(commonJSExports).toBe(Delta);
  });
});