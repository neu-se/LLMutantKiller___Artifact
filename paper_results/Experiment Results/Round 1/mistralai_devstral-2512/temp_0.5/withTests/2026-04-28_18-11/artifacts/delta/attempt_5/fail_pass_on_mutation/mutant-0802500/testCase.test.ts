import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with retain optimization", () => {
  it("should handle insert with matching length in retain optimization", () => {
    const a = new Delta().insert("Hello");
    const b = new Delta().retain(5).insert("X");
    const expected = new Delta().insert("HelloX");
    expect(a.compose(b)).toEqual(expected);
  });
});