import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta retain method", () => {
  it("should handle non-number retain length correctly", () => {
    const delta = new Delta();
    delta.retain({ key: "value" });
    expect(delta.ops).toEqual([{ retain: { key: "value" } }]);
  });
});