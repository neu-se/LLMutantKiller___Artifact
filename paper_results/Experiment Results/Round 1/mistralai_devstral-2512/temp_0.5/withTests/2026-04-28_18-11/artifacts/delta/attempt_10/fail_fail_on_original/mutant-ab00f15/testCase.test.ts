import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("retain()", () => {
  it("should not add retain operation when length is a function", () => {
    const delta = new Delta();
    delta.retain(() => 0 as any);
    expect(delta.ops.length).toBe(0);
  });
});