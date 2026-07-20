import Delta from "../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose()", () => {
  it("compose where other starts with an insert should produce correct result", () => {
    const a = new Delta().insert("Hello");
    const b = new Delta().insert("World");
    const expected = new Delta().insert("World").insert("Hello");
    expect(a.compose(b)).toEqual(expected);
  });
});