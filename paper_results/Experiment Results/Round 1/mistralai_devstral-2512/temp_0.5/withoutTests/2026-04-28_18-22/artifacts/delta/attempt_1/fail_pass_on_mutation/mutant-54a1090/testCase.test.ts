import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose", () => {
  it("should correctly compose when first operation is an insert with length greater than firstLeft", () => {
    const delta1 = new Delta().insert("Hello");
    const delta2 = new Delta().retain(3);
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: "Hello" }];
    expect(result.ops).toEqual(expectedOps);
  });
});