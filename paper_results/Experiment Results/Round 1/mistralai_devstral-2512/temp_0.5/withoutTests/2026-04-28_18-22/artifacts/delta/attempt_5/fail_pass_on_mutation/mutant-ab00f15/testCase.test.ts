import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta retain method", () => {
  it("should handle retain with string input", () => {
    const delta = new Delta();
    delta.retain("test");
    expect(delta.ops).toEqual([{ retain: "test" }]);
  });
});