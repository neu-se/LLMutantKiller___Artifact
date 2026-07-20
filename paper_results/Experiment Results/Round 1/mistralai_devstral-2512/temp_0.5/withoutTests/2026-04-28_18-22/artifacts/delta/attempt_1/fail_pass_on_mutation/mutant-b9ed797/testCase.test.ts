import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta push method", () => {
  it("should correctly push a new operation when the last operation is not mergeable", () => {
    const delta = new Delta();
    delta.insert("Hello");
    delta.retain(3, { bold: true });
    delta.insert(" World");
    expect(delta.ops.length).toBe(3);
    expect(delta.ops[0]).toEqual({ insert: "Hello" });
    expect(delta.ops[1]).toEqual({ retain: 3, attributes: { bold: true } });
    expect(delta.ops[2]).toEqual({ insert: " World" });
  });
});