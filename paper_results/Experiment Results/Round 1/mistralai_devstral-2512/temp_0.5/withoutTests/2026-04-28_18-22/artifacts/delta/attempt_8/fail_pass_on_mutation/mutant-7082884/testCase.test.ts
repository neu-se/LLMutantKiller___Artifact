import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta diff method", () => {
  it("should return empty delta when comparing same ops reference", () => {
    const ops = [{ insert: "test" }];
    const delta1 = new Delta(ops);
    const delta2 = new Delta(ops);
    const result = delta1.diff(delta2);
    expect(result.ops).toEqual([]);
  });
});