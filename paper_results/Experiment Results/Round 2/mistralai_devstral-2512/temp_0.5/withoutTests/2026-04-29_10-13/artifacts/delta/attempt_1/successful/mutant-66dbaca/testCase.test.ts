import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta module export', () => {
  it('should export Delta as default and as a property', () => {
    // This test verifies that Delta is properly exported both as default and as a property
    // The mutation removes the module.exports assignments, which would break this behavior
    expect(Delta).toBeDefined();
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);
    expect(moduleExports).toBe(Delta);
  });
});