import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with retain optimization", () => {
  it("should handle insert within retain range when firstOther has no attributes", () => {
    const a = new Delta().insert("A");
    const b = new Delta().retain(2).insert("B");
    const expected = new Delta().insert("AB");
    expect(a.compose(b)).toEqual(expected);
  });
});