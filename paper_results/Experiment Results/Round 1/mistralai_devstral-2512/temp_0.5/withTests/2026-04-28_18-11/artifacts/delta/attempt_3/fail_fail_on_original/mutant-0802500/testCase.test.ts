import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with retain optimization", () => {
  it("should correctly handle insert when peekType is 'insert'", () => {
    const a = new Delta().insert("A");
    const b = new Delta().retain(1).insert("B");
    const expected = new Delta().insert("B").insert("A");
    expect(a.compose(b)).toEqual(expected);
  });
});