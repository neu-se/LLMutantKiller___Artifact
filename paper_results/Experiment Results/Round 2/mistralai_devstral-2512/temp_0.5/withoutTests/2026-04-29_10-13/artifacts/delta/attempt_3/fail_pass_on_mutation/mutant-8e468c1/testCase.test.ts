import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with initial retain", () => {
  it("should correctly handle initial retain when composing with mixed operations", () => {
    const delta1 = new Delta().insert("Hello").insert("World");
    const delta2 = new Delta().retain(3).insert("X").delete(2).retain(5);
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: "HelXWorld" }];
    expect(result.ops).toEqual(expectedOps);
  });
});