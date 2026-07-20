import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly composes when other starts with a numeric retain without attributes, preserving inserts from this", () => {
    const a = new Delta()
      .insert("foo", { bold: true })
      .insert("bar");

    const b = new Delta()
      .retain(3)
      .retain(3, { italic: true });

    const result = a.compose(b);

    expect(result.ops).toEqual([
      { insert: "foo", attributes: { bold: true } },
      { insert: "bar", attributes: { italic: true } },
    ]);
  });
});