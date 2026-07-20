import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly composes a document with a change", () => {
    const a = new Delta().insert("hello world");
    const b = new Delta().retain(6).insert("there ").delete(5);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: "hello there " }]);
  });
});