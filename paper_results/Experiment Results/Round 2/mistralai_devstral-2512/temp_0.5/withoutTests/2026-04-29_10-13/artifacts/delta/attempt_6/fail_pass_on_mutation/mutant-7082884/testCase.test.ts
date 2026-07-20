import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta.diff", () => {
  it("should return empty Delta when comparing Deltas with identical ops arrays", () => {
    const ops = [{ insert: "test" }];
    const delta1 = new Delta(ops);
    const delta2 = new Delta(ops);
    const result = delta1.diff(delta2);
    expect(result.ops).toEqual([]);
  });
});