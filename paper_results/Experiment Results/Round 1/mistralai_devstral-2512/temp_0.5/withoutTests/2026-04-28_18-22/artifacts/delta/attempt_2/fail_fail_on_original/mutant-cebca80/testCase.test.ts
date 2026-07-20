import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert", () => {
  it("should correctly handle retain operations with object data", () => {
    const base = new Delta().insert({ type: "embed", data: "original" });
    const delta = new Delta().retain({ type: "embed", data: "modified" });
    const inverted = delta.invert(base);
    const expected = new Delta().retain({ type: "embed", data: "original" });
    expect(inverted.ops).toEqual(expected.ops);
  });
});