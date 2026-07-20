import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("should correctly compose when this has multiple inserts with different attributes before a retain", () => {
    const a = new Delta()
      .insert("A", { bold: true })
      .insert("B", { italic: true });
    const b = new Delta().retain(2).delete(1);
    
    // Add a character after to make the delete meaningful
    const fullA = new Delta()
      .insert("A", { bold: true })
      .insert("B", { italic: true })
      .insert("C");
    
    const result = fullA.compose(b);
    expect(result.ops).toEqual([
      { insert: "A", attributes: { bold: true } },
      { insert: "B", attributes: { italic: true } },
    ]);
  });
});