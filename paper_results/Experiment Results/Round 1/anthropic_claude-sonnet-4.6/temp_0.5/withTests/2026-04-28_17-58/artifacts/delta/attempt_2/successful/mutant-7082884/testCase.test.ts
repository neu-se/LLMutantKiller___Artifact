import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("diff() same document shortcut", () => {
  it("should return an empty delta when diffing a document with itself (same ops reference)", () => {
    // The original code has: if (this.ops === other.ops) { return new Delta(); }
    // The mutated code has: if (false) { return new Delta(); }
    // When the same delta is passed to diff(), this.ops === other.ops is true,
    // so the original returns new Delta() immediately.
    // With the mutation, it proceeds to the diff logic which tries to map ops
    // and would throw if any op is not an insert (e.g., retain or delete).
    // We use a delta with a retain op to trigger the error in the mutated code.
    const a = new Delta().retain(1).insert("A");
    // Calling diff with itself - same object reference means this.ops === other.ops
    // Original: returns empty Delta immediately (no error)
    // Mutated: tries to run diff logic, encounters retain op, throws error
    expect(() => {
      const result = a.diff(a);
      expect(result).toEqual(new Delta());
    }).not.toThrow();
  });
});