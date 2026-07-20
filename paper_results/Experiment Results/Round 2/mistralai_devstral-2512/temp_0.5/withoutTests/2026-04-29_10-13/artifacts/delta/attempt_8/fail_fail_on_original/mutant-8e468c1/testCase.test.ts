import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with initial retain", () => {
  it("should correctly handle initial retain when composing with insert and partial retain", () => {
    const delta1 = new Delta().insert("Hello").insert("World");
    const delta2 = new Delta().retain(3).insert("X").retain(7);
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: "HelXWorld" }];
    expect(result.ops).toEqual(expectedOps);
  });
});