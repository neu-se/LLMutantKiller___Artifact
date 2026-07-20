import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transformPosition", () => {
  it("insert before position with priority true should still shift when offset < index", () => {
    // Original condition: (offset < index || !priority)
    // With offset=0, index=3, priority=true: (0 < 3 || false) = true → shift by 3 → returns 6
    // Mutated condition: (false || !priority) = false → no shift → returns 3
    const delta = new Delta().insert("ABC");
    expect(delta.transformPosition(3, true)).toEqual(6);
  });
});