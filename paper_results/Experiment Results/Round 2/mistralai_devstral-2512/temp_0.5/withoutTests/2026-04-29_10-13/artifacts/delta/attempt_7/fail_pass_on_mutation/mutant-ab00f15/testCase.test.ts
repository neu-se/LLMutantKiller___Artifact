import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta retain method", () => {
  it("should handle zero-length number retain correctly", () => {
    const delta = new Delta();
    delta.retain(0);
    expect(delta.ops).toEqual([]);
  });
});