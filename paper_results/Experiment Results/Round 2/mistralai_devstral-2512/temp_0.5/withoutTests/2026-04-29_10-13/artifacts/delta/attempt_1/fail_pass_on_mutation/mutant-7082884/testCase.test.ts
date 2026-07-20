import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta.diff", () => {
  it("should return an empty Delta when comparing identical Deltas", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().insert("test");
    const result = delta1.diff(delta2);
    expect(result.ops).toEqual([]);
  });
});