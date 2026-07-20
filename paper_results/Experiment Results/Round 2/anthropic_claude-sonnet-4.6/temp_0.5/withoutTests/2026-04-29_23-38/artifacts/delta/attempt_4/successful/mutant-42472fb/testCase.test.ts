import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("preserves separate insert ops from this when other starts with plain retain", () => {
    const a = new Delta([{ insert: "A" }, { insert: "B" }]);
    const b = new Delta().retain(2);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: "A" }, { insert: "B" }]);
  });
});