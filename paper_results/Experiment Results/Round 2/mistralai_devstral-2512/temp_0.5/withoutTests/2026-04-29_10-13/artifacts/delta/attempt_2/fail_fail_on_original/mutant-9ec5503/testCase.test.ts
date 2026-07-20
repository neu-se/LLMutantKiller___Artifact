import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with embed types", () => {
  it("should correctly compose deltas with embed types when firstOther is null", () => {
    const delta1 = new Delta().insert({ image: "test.jpg" });
    const delta2 = new Delta().retain({ image: "new.jpg" });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: { image: "test.jpg" } }]);
  });
});