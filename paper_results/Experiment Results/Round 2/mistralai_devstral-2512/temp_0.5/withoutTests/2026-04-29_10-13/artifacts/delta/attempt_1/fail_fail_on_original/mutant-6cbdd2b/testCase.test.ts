import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with retain", () => {
  it("should not retain when firstOther has attributes", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().retain(3, { bold: true });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "hello" }]);
  });
});