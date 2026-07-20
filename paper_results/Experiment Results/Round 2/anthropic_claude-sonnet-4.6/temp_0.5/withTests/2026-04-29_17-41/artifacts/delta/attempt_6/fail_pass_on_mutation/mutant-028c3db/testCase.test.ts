import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() retain start optimization", () => {
  it("inserts before retained content with null attributes on retain should not gain attributes", () => {
    const a = new Delta().insert("Hi", { bold: true }).retain(1);
    const b = new Delta().retain(2).retain(1, { italic: true });
    const expected = new Delta().insert("Hi", { bold: true }).retain(1, { italic: true });
    expect(a.compose(b)).toEqual(expected);
  });
});