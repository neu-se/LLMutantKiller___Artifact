import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with empty initial retain", () => {
  it("should skip initial retain when composing with empty delta", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(0).insert("X");
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "test" }, { insert: "X" }]);
  });
});