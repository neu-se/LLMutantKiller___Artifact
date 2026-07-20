import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with retain", () => {
  it("should skip retain optimization when firstOther has attributes", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().retain(3, { bold: true });
    const delta3 = new Delta().insert(" world");
    const result = delta1.compose(delta2.compose(delta3));
    expect(result.ops).toEqual([
      { insert: "hel", attributes: { bold: true } },
      { insert: "lo world" }
    ]);
  });
});