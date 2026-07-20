import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert with retain object", () => {
  it("should correctly handle retain with object type", () => {
    const base = new Delta().insert({ type: "embed", data: "original" });
    const delta = new Delta().retain({ type: "embed", data: "modified" });
    const inverted = delta.invert(base);
    expect(inverted.ops).toHaveLength(1);
    expect(inverted.ops[0]).toHaveProperty("retain");
    expect(typeof inverted.ops[0].retain).toBe("object");
  });
});