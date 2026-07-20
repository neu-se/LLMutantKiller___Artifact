import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("should correctly handle inserts from this when other starts with a retain followed by retain with attributes", () => {
    const a = new Delta().insert("A");
    const b = new Delta([
      { retain: 1 },
      { retain: 1, attributes: { bold: true } },
    ]);
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { insert: "A" },
      { retain: 1, attributes: { bold: true } },
    ]);
  });
});