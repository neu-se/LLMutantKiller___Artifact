import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() retain optimization with attributes", () => {
  it("should not optimize when firstOther has attributes", () => {
    const a = new Delta().insert("A");
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().insert("A", { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});