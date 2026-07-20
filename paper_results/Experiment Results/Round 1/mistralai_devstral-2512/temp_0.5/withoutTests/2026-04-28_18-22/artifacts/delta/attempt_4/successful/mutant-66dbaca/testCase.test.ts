import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should have module.exports defined when imported via require", () => {
    // This test verifies that module.exports is properly set
    // The mutation removes the module.exports assignment, which should break this test
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    expect(moduleExports).toBe(Delta);
  });
});