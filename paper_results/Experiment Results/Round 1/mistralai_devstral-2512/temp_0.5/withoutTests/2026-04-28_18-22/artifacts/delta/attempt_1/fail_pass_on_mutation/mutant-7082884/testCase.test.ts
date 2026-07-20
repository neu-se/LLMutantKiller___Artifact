import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta diff method", () => {
  it("should return an empty delta when comparing identical deltas", () => {
    const delta1 = new Delta([{ insert: "test" }]);
    const delta2 = new Delta([{ insert: "test" }]);
    const result = delta1.diff(delta2);
    expect(result.ops).toEqual([]);
  });
});