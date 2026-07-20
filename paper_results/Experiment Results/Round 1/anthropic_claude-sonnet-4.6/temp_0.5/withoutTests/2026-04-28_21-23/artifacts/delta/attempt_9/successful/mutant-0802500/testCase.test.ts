import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("should preserve separate insert ops from this when composing with a leading retain", () => {
    const a = new Delta([{ insert: "A" }, { insert: "B" }, { retain: 2 }]);
    const b = new Delta().retain(2);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: "A" }, { insert: "B" }]);
  });
});