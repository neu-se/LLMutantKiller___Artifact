import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export in Node.js environment", () => {
  it("should have module.exports defined when running in Node.js", () => {
    // This test verifies that module.exports is properly set in Node.js environment
    // The mutation changes the condition from `typeof module === 'object'` to `if (false)`
    // which would prevent module.exports from being set
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);
    expect(moduleExports).toBe(Delta);
  });
});