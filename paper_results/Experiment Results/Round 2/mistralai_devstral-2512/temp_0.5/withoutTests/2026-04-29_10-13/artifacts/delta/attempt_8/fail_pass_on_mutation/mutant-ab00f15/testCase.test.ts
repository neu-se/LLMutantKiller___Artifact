import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta retain method", () => {
  it("should handle negative number retain correctly", () => {
    const delta = new Delta();
    delta.retain(-5);
    expect(delta.ops).toEqual([]);
  });
});