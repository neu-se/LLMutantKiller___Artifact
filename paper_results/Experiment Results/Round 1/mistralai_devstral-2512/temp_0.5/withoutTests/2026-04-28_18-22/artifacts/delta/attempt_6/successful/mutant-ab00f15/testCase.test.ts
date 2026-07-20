import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta retain method", () => {
  it("should correctly handle retain with zero-length string", () => {
    const delta = new Delta();
    delta.retain("");
    expect(delta.ops).toEqual([{ retain: "" }]);
  });
});