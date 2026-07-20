import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose optimization", () => {
  it("should optimize when composing with a retain that has attributes", () => {
    const delta1 = new Delta().insert("hello").insert(" world");
    const delta2 = new Delta().retain(5, { bold: true });
    const result = delta1.compose(delta2);
    expect(result.ops.length).toBe(2);
    expect(result.ops[0]).toEqual({ insert: "hello", attributes: { bold: true } });
    expect(result.ops[1]).toEqual({ insert: " world" });
  });
});