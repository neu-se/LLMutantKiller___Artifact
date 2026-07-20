import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with leading retain", () => {
  it("should handle leading retain with insert operations correctly", () => {
    const delta1 = new Delta().insert("Hello");
    const delta2 = new Delta().retain(3).insert("X");
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: "Hel" }, { insert: "X" }, { insert: "lo" }];
    expect(result.ops).toEqual(expectedOps);
  });
});