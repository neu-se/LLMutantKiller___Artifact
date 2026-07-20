import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("retain()", () => {
  it("should add retain operation when length is a negative number", () => {
    const delta = new Delta();
    delta.retain(-1);
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0]).toEqual({ retain: -1 });
  });
});