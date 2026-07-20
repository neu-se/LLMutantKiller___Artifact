import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("compose: optimization correctly handles inserts fitting within first retain", () => {
    const a = new Delta()
      .insert("hello", { bold: true })
      .insert(" world");
    const b = new Delta()
      .retain(5)
      .retain(6, { italic: true });
    const result = a.compose(b);
    expect(result.ops).toEqual([
      { insert: "hello", attributes: { bold: true } },
      { insert: " world", attributes: { italic: true } },
    ]);
  });
});