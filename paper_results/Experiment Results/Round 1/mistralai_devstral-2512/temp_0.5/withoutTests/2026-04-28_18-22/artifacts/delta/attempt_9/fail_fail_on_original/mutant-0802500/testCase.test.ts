import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with initial retain", () => {
  it("should correctly handle initial retain without attributes when first delta has insert", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(5);
    const result = delta1.compose(delta2);
    // In original code, the insert should be consumed by the retain
    // In mutated code, the condition fails so the insert remains unchanged
    expect(result.ops).toEqual([
      { insert: "test" },
      { retain: 1 }
    ]);
  });
});