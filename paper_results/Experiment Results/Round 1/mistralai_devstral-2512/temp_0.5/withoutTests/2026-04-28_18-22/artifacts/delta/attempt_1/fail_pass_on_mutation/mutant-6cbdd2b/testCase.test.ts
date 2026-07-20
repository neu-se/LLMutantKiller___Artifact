import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with retain", () => {
  it("should not skip insert operations when composing with a retain that has attributes", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().retain(5, { bold: true });
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: "hello", attributes: { bold: true } }];
    expect(result.ops).toEqual(expectedOps);
  });
});