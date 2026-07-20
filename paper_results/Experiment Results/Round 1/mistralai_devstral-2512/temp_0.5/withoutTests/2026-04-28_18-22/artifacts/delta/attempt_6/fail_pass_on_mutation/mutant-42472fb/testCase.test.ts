import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with leading retain", () => {
  it("should handle leading retain with insert operations correctly", () => {
    const delta1 = new Delta().insert("Hello");
    const delta2 = new Delta().retain(3).insert("X");
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: "HelXlo" }];
    expect(result.ops).toEqual(expectedOps);
  });
});