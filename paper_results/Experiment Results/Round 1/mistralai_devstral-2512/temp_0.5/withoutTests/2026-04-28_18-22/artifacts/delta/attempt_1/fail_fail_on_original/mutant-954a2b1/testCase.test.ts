import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with retain optimization", () => {
  it("should correctly handle null firstOther in compose optimization", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().retain(5);

    // This should trigger the optimization path in compose
    const result = delta1.compose(delta2);

    // The result should be equivalent to just delta2 since delta1 is all inserts
    // and delta2 is a retain that covers the entire length
    expect(result.ops).toEqual([{ retain: 5 }]);
  });
});