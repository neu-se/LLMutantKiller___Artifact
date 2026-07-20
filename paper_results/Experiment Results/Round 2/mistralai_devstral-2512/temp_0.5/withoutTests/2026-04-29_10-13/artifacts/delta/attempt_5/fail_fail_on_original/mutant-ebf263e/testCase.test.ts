import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with retain operation", () => {
  it("should correctly compose when first operation is retain with null attributes and insert follows", () => {
    const delta1 = new Delta().retain(5).insert("test");
    const delta2 = new Delta().retain(3);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ retain: 3 }, { insert: "test" }]);
  });
});