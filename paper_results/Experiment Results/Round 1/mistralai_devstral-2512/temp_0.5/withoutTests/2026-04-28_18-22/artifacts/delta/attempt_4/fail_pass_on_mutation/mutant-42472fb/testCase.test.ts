import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with leading retain", () => {
  it("should handle leading retain with insert operations correctly", () => {
    const delta1 = new Delta().insert("Hello");
    const delta2 = new Delta().retain(2).insert("X").retain(3);
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: "HeXllo" }];
    expect(result.ops).toEqual(expectedOps);
  });
});