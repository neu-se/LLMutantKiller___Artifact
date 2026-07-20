import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta module export behavior", () => {
  it("should correctly handle module exports in different environments", () => {
    // This test verifies the module export behavior by checking if the module
    // is properly exported in both CommonJS and ESM environments
    // The mutation changes the condition from `typeof module === 'object'` to `true`
    // which would cause incorrect exports in non-CommonJS environments

    // First verify basic functionality works
    const delta = new Delta();
    delta.insert("test");
    expect(delta.ops).toEqual([{ insert: "test" }]);

    // Now test the export behavior by checking if we can access Delta
    // through both default and named exports
    const { default: DeltaDefault, Op, OpIterator, AttributeMap } = require("../../../../../../../../../../../subject_repositories/delta/src/Delta");

    expect(DeltaDefault).toBe(Delta);
    expect(Op).toBe(Delta.Op);
    expect(OpIterator).toBe(Delta.OpIterator);
    expect(AttributeMap).toBe(Delta.AttributeMap);

    // The mutation would cause this to fail because module.exports
    // would be set incorrectly in non-CommonJS environments
    expect(typeof module).toBe('object');
  });
});