import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with retain optimization", () => {
  it("should not optimize when firstOther has attributes", () => {
    const a = new Delta().insert("A", { bold: true });
    const b = new Delta().retain(1, { italic: true }).insert("B");
    const expected = new Delta()
      .insert("A", { bold: true, italic: true })
      .insert("B");
    expect(a.compose(b)).toEqual(expected);
  });
});