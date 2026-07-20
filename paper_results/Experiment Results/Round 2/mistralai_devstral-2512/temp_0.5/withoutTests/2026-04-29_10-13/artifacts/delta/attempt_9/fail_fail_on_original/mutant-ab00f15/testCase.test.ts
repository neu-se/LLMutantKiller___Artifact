import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta retain method", () => {
  it("should handle null retain length correctly", () => {
    const delta = new Delta();
    delta.retain(null as any);
    expect(delta.ops).toEqual([]);
  });
});