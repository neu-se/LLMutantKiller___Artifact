import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("should preserve null attributes in inserts when composing with leading retain", () => {
    const a = new Delta().insert("A", { bold: null });
    const b = new Delta().retain(1);
    const result = a.compose(b);
    // In original: insert pushed directly with {bold: null} preserved
    // In mutated: goes through AttributeMap.compose which might strip null values
    expect(result.ops).toEqual([{ insert: "A", attributes: { bold: null } }]);
  });
});