import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transformPosition", () => {
  it("insert before position with no priority should shift index forward", () => {
    const delta = new Delta().insert("A");
    // Insert before position 2 should shift it to 3 when priority is false
    const result = delta.transformPosition(2, false);
    expect(result).toEqual(3);
  });
});