import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with retain optimization", () => {
  it("should correctly handle insert operations during compose when first operation is retain", () => {
    const delta1 = new Delta().retain(5).insert("test");
    const delta2 = new Delta().retain(3);
    const result = delta1.compose(delta2);
    const expectedOps = [
      { retain: 3 },
      { insert: "te" },
      { retain: 2 },
      { insert: "st" }
    ];
    expect(result.ops).toEqual(expectedOps);
  });
});