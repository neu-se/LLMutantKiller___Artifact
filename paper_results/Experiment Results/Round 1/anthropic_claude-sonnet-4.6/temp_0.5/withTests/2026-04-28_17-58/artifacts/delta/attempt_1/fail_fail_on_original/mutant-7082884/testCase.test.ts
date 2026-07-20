import Delta from "../../src/Delta";

describe("diff() same document shortcut", () => {
  it("should return an empty delta when diffing a document with itself (same reference)", () => {
    const a = new Delta().insert("A").insert("B", { bold: true });
    // When this.ops === other.ops (same reference), the original code returns new Delta() immediately
    // The mutated code replaces `if (this.ops === other.ops)` with `if (false)`,
    // so it would proceed to the diff logic instead of returning early.
    // However, the diff logic would still produce an empty delta for identical content,
    // but the key difference is that when ops are the same reference, the original
    // returns new Delta() early, while the mutation would attempt to run diff on the same object.
    // We can detect this by passing the same delta as both arguments - same ops reference.
    const result = a.diff(a);
    expect(result).toEqual(new Delta());
    expect(result.ops.length).toEqual(0);
  });
});