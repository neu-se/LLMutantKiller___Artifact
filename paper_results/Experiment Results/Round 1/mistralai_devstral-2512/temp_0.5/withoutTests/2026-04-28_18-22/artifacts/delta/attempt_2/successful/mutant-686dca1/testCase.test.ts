import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export behavior", () => {
  it("should have Delta available as module.exports when module is an object", () => {
    // This test directly checks the module export behavior
    // The mutation changes the condition from checking if module IS an object to if it's NOT an object
    // In Node.js environment, module is always an object, so the mutation would prevent the exports
    const moduleExports = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    expect(moduleExports).toBeDefined();
    expect(moduleExports.default).toBe(Delta);
    expect(moduleExports).toBe(Delta);
  });
});