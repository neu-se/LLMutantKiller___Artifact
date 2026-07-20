import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta.diff", () => {
  it("should return empty Delta when comparing same Delta instance", () => {
    const delta = new Delta().insert("test");
    const result = delta.diff(delta);
    expect(result.ops).toEqual([]);
  });
});