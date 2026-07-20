import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta invert with retain object", () => {
  it("should correctly invert a delta with object retain", () => {
    const base = new Delta().insert("hello");
    const delta = new Delta().retain({ type: "embed", data: "test" });
    const inverted = delta.invert(base);
    const expected = new Delta().retain({ type: "embed", data: "test" });
    expect(inverted.ops).toEqual(expected.ops);
  });
});