import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with retain optimization", () => {
  it("should handle insert at the start of retain range", () => {
    const a = new Delta().insert("Hello");
    const b = new Delta().retain(5).insert("X");
    const expected = new Delta().insert("HelloX");
    expect(a.compose(b)).toEqual(expected);
  });
});