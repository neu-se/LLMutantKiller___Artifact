import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with initial retain", () => {
  it("should correctly skip initial retain when composing with insert operations", () => {
    const delta1 = new Delta().insert("Hello");
    const delta2 = new Delta().retain(2).insert("XY");
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: "HeXYllo" }];
    expect(result.ops).toEqual(expectedOps);
  });
});