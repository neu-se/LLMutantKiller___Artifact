import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("preserves non-canonical op boundaries when other starts with plain retain", () => {
    const base = new Delta([{ insert: "A" }, { insert: "B" }, { retain: 5 }, { insert: "C" }]);
    const other = new Delta([{ retain: 7 }]);
    const result = base.compose(other);
    expect(result.ops).toEqual([
      { insert: "A" },
      { insert: "B" },
      { retain: 5 },
      { insert: "C" },
    ]);
  });
});