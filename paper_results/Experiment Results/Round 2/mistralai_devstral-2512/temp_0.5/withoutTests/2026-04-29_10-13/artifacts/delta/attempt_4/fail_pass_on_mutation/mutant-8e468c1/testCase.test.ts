import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with initial retain", () => {
  it("should correctly handle initial retain when composing with insert at start", () => {
    const delta1 = new Delta().insert("Hello");
    const delta2 = new Delta().retain(5).insert("!");
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: "Hello!" }];
    expect(result.ops).toEqual(expectedOps);
  });
});