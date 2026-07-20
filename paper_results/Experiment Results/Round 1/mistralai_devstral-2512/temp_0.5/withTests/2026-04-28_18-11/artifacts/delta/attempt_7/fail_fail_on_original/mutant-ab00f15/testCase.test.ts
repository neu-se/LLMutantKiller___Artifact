import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("retain()", () => {
  it("should not add retain operation when length is undefined", () => {
    const delta = new Delta();
    delta.retain(undefined as any);
    expect(delta.ops.length).toBe(0);
  });
});