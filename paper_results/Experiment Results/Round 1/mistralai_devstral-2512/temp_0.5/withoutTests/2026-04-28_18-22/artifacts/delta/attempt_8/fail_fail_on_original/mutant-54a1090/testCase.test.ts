import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose", () => {
  it("should correctly compose when first operation is insert and second is retain with length less than insert", () => {
    const delta1 = new Delta().insert("testing");
    const delta2 = new Delta().retain(4);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "test" }, { insert: "ing" }]);
  });
});