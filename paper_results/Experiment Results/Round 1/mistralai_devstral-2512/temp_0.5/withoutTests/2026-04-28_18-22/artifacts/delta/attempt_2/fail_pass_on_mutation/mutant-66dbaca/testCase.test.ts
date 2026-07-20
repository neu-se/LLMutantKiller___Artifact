import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should have Delta available through module.exports", () => {
    // This test verifies that Delta is available through module.exports
    // The mutation removes the module.exports assignment, which should break this test
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBeDefined();
    expect(moduleExports.default).toBe(Delta);
  });
});