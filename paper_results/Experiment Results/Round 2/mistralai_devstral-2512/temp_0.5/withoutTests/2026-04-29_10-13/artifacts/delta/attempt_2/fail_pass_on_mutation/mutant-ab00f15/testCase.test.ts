import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta retain method", () => {
  it("should handle negative retain length correctly", () => {
    const delta = new Delta();
    delta.retain(-1);
    expect(delta.ops).toEqual([]);
  });
});