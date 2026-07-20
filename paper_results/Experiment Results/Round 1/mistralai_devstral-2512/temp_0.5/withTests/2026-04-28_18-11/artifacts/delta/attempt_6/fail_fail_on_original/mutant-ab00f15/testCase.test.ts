import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("retain()", () => {
  it("should not add retain operation when length is an object", () => {
    const delta = new Delta();
    delta.retain({ length: 0 } as any);
    expect(delta.ops.length).toBe(0);
  });
});