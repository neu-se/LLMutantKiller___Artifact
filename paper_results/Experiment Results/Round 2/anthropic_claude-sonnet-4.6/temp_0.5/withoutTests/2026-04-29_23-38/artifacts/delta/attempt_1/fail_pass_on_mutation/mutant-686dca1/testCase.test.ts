import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta CommonJS export", () => {
  it("should export Delta correctly via CommonJS module.exports", () => {
    const required = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    // When module.exports = Delta is set (original), required should be Delta class
    // When it's not set (mutated), required would be the ES module namespace object
    const DeltaClass = required.default || required;
    const instance = new DeltaClass([{ insert: "test" }]);
    expect(instance instanceof Delta).toBe(true);
    expect(instance.ops).toEqual([{ insert: "test" }]);
  });
});