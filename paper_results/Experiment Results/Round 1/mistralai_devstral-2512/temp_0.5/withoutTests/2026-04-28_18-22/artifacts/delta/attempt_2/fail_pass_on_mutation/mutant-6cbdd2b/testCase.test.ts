import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with retain", () => {
  it("should handle retain without attributes correctly", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().retain(5);
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: "hello" }];
    expect(result.ops).toEqual(expectedOps);
  });
});