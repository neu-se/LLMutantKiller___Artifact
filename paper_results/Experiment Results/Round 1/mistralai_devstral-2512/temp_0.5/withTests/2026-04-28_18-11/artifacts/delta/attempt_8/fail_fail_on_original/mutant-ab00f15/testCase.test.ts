import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("retain()", () => {
  it("should not add retain operation when length is a boolean false", () => {
    const delta = new Delta();
    delta.retain(false as any);
    expect(delta.ops.length).toBe(0);
  });
});