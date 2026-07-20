import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta", () => {
  it("should correctly compose two deltas", () => {
    const a = new Delta().insert("Hello");
    const b = new Delta().retain(5).insert(" World");
    const composed = a.compose(b);
    expect(composed.ops).toEqual([{ insert: "Hello World" }]);
  });
});