import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with retain optimization", () => {
  it("should handle insert when thisIter.peekType() is 'insert'", () => {
    const a = new Delta().insert("A");
    const b = new Delta().retain(1).insert("B");
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: "AB" }]);
  });
});