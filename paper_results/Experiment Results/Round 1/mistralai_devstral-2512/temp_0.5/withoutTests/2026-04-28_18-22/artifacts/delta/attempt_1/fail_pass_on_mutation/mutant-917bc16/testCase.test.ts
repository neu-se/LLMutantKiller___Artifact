import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose optimization", () => {
  it("should optimize when composing with a retain-only delta", () => {
    const delta1 = new Delta().insert("Hello");
    const delta2 = new Delta().retain(5);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "Hello" }]);
  });
});