import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly composes when other starts with a retain equal to length of first insert", () => {
    const a = new Delta([{ insert: "hello" }, { insert: " world" }]);
    const b = new Delta().retain(5);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: "hello" }, { insert: " world" }]);
  });
});