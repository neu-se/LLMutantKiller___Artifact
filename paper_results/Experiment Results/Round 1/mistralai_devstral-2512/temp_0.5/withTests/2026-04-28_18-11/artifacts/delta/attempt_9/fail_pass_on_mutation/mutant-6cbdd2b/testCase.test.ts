import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() retain optimization edge case", () => {
  it("should handle plain retain followed by insert correctly", () => {
    const a = new Delta().insert("A").insert("B").insert("C");
    const b = new Delta().retain(2).insert("X");
    const expected = new Delta().insert("ABXC");
    expect(a.compose(b)).toEqual(expected);
  });
});