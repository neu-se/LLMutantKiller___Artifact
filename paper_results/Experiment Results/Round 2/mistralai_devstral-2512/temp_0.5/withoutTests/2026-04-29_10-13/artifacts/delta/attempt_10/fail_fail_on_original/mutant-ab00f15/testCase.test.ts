import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta retain method", () => {
  it("should handle undefined retain length correctly", () => {
    const delta = new Delta();
    delta.retain(undefined as any);
    expect(delta.ops).toEqual([]);
  });
});