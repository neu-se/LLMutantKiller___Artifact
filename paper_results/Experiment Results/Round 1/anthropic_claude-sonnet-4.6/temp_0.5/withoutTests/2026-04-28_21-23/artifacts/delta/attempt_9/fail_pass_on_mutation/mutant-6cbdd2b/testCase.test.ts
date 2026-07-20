import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly composes unmerged inserts with a retain larger than total length", () => {
    const a = new Delta([{ insert: "hello" }, { insert: " world" }]);
    const b = new Delta().retain(20);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: "hello" }, { insert: " world" }]);
  });
});