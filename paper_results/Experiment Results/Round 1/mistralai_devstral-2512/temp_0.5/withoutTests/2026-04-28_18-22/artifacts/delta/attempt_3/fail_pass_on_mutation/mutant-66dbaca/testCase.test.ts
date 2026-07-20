import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should export Delta through module.exports.default", () => {
    // This test verifies that module.exports.default is set to Delta
    // The mutation removes the module.exports assignment, which should break this test
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    expect(moduleExports.default).toBe(Delta);
  });
});