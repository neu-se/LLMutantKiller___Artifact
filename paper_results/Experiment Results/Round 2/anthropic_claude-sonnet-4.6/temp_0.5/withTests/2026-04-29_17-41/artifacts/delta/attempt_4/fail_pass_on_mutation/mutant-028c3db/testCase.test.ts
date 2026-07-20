import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with empty other delta", () => {
  it("should return a copy of this when composed with empty delta", () => {
    const a = new Delta().insert("Hello");
    const b = new Delta();
    const expected = new Delta().insert("Hello");
    expect(a.compose(b)).toEqual(expected);
  });
});