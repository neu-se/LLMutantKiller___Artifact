import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta CommonJS export", () => {
  it("should export Delta as module.exports directly so that require() returns the Delta constructor", () => {
    const required = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    // In original code: module.exports = Delta, so required IS the Delta class
    // In mutated code: block doesn't run, so required is ES module namespace with {default: Delta}
    // Check that required is the same reference as the imported Delta class
    expect(required).toBe(Delta);
  });
});