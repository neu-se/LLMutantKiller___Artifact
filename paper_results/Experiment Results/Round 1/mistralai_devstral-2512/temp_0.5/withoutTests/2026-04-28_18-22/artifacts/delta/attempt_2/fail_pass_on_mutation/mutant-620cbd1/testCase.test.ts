import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with retain operation", () => {
  it("should correctly handle retain operation with attributes", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().retain(5, { bold: true });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "hello", attributes: { bold: true } }]);
  });
});