import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta retain method", () => {
  it("should not add an operation when retain length is zero", () => {
    const delta = new Delta();
    delta.retain(0);
    expect(delta.ops).toEqual([]);
  });
});