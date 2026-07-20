import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta push method", () => {
  it("should correctly push a new operation when the last operation is not mergeable and index is at the end", () => {
    const delta = new Delta();
    delta.insert("Hello");
    delta.push({ retain: 3, attributes: { bold: true } });
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[0]).toEqual({ insert: "Hello" });
    expect(delta.ops[1]).toEqual({ retain: 3, attributes: { bold: true } });
  });
});