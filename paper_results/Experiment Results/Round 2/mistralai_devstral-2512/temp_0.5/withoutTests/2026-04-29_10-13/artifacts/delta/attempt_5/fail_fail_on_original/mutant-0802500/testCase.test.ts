import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with retain optimization", () => {
  it("should correctly handle insert operations during compose when first operation is retain", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(3).insert("more");
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([
      { retain: 3 },
      { insert: "test" },
      { insert: "more" }
    ]);
  });
});