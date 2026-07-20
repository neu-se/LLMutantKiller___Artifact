import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with retain optimization", () => {
  it("should handle insert within retain range correctly", () => {
    const a = new Delta().insert("Hello");
    const b = new Delta().retain(3).insert("X");
    const expected = new Delta().insert("HelXlo");
    expect(a.compose(b)).toEqual(expected);
  });
});