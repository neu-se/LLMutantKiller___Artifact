import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with retain optimization", () => {
  it("should optimize insert when peekType is 'insert' and within retain length", () => {
    const a = new Delta().insert("A");
    const b = new Delta().retain(1).insert("B");
    const expected = new Delta().insert("AB");
    expect(a.compose(b)).toEqual(expected);
  });
});