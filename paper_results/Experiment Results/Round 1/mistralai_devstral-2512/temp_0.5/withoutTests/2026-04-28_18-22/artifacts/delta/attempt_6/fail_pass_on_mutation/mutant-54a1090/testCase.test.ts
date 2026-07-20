import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose", () => {
  it("should correctly compose when first operation is insert and second is retain with attributes", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(2, { bold: true });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "te", attributes: { bold: true } }, { insert: "st" }]);
  });
});