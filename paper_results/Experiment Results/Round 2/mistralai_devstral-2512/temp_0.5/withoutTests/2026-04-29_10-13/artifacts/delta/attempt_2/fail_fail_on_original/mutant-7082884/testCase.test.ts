import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta.diff", () => {
  it("should return a non-empty Delta when comparing different Deltas with same ops reference", () => {
    const ops = [{ insert: "test" }];
    const delta1 = new Delta(ops);
    const delta2 = new Delta(ops);
    delta2.insert(" different");
    const result = delta1.diff(delta2);
    expect(result.ops.length).toBeGreaterThan(0);
  });
});