import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization", () => {
  it("should optimize when composing insert with retain", () => {
    const delta1 = new Delta().insert("abc");
    const delta2 = new Delta().retain(2);
    const result = delta1.compose(delta2);
    // The original code should optimize this case by consuming the insert
    // The mutated code won't recognize the insert type and won't optimize
    expect(result.ops).toEqual([
      { retain: 2 },
      { insert: "c" }
    ]);
  });
});