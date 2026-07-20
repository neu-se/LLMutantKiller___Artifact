import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly composes when other starts with a numeric retain covering all inserts", () => {
    const a = new Delta().insert("hello");
    const b = new Delta().retain(5);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: "hello" }]);
  });
});