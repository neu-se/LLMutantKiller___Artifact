import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization", () => {
  it("should consume insert operations when composing with retain", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(5);
    const result = delta1.compose(delta2);
    // Original code should consume the insert (length 4 <= retain 5)
    // and produce retain(1) followed by the insert
    // Mutated code won't recognize the insert type and won't consume it
    expect(result.ops).toEqual([
      { retain: 1 },
      { insert: "test" }
    ]);
  });
});