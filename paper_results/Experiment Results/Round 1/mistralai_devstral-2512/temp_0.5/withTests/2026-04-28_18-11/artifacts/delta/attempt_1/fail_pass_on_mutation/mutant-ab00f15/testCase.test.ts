import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("retain()", () => {
  it("should not add retain operation when length is zero", () => {
    const delta = new Delta();
    delta.retain(0);
    expect(delta.ops.length).toBe(0);
  });
});