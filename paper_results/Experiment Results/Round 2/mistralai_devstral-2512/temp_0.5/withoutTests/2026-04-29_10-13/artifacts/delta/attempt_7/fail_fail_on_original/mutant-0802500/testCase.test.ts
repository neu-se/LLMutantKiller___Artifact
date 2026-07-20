import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with retain optimization", () => {
  it("should correctly handle insert operations during compose when first operation is retain", () => {
    const delta1 = new Delta().insert("abc");
    const delta2 = new Delta().retain(1);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([
      { retain: 1 },
      { insert: "bc" }
    ]);
  });
});