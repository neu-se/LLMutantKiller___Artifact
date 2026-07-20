import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with retain operation", () => {
  it("should correctly optimize when composing with retain operation that matches remaining operations", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(4);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "test" }]);
    expect(result.ops.length).toBe(1);
  });
});