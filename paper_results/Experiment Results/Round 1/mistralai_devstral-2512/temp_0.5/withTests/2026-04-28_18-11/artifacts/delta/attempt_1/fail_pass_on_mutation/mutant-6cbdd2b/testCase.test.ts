import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with retain optimization", () => {
  it("should handle retain with attributes at start correctly", () => {
    const a = new Delta().insert("A", { bold: true }).insert("B").insert("C", { bold: true });
    const b = new Delta().retain(3, { italic: true });
    const expected = new Delta()
      .insert("A", { bold: true, italic: true })
      .insert("B", { italic: true })
      .insert("C", { bold: true, italic: true });
    expect(a.compose(b)).toEqual(expected);
  });
});