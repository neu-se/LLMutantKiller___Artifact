import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transformPosition", () => {
  it("insert at position with priority true should not shift index", () => {
    // With priority=true, an insert at the same offset as index should NOT shift
    // The mutated condition (false || !priority) with priority=true gives (false || false) = false
    // So it would NOT shift - same as original
    // But with priority=false: (false || true) = true - shifts
    // Need to find where false vs original condition differs
    const delta = new Delta().insert("AB");
    // Insert of length 2 before position 0
    // With priority=true: original might use offset <= index differently
    expect(delta.transformPosition(0, true)).toEqual(0);
    expect(delta.transformPosition(0, false)).toEqual(2);
  });
});