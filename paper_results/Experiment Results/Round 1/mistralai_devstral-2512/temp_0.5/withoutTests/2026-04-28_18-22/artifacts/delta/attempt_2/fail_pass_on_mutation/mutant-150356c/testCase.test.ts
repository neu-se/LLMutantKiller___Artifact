import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with initial retain", () => {
  it("should not enter infinite loop when composing with initial retain", () => {
    const delta1 = new Delta().insert("test");
    const delta2 = new Delta().retain(2).insert("X");
    const startTime = Date.now();
    const result = delta1.compose(delta2);
    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(1000);
    expect(result.ops).toEqual([{ insert: "teXst" }]);
  });
});