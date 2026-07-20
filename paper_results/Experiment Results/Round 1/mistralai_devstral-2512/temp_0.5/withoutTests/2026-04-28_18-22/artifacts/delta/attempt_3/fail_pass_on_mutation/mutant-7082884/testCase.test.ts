import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta diff method", () => {
  it("should return empty delta when comparing same delta instance", () => {
    const delta = new Delta([{ insert: "test" }]);
    const result = delta.diff(delta);
    expect(result.ops).toEqual([]);
  });
});