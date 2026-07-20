import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta retain method", () => {
  it("should handle string retain length correctly", () => {
    const delta = new Delta();
    delta.retain("test");
    expect(delta.ops).toEqual([{ retain: "test" }]);
  });
});