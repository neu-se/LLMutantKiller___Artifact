import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with retain optimization", () => {
  it("should not apply optimization when firstOther has attributes", () => {
    const a = new Delta().insert("A");
    const b = new Delta().retain(1, { bold: true }).insert("B");
    const expected = new Delta()
      .insert("A", { bold: true })
      .insert("B");
    const result = a.compose(b);
    expect(result).toEqual(expected);
    // Verify the optimization didn't happen by checking internal structure
    expect(result.ops.length).toBe(2);
    expect(result.ops[0]).toEqual({ insert: "A", attributes: { bold: true } });
    expect(result.ops[1]).toEqual({ insert: "B" });
  });
});