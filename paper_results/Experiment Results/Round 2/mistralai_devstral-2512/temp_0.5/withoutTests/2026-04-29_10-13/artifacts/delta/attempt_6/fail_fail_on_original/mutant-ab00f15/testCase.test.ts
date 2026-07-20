import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta retain method", () => {
  it("should handle zero-length string retain correctly", () => {
    const delta = new Delta();
    delta.retain("");
    expect(delta.ops).toEqual([]);
  });
});