import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta retain method", () => {
  it("should not add a retain operation when length is zero", () => {
    const delta = new Delta();
    delta.retain(0);
    expect(delta.ops).toEqual([]);
  });
});