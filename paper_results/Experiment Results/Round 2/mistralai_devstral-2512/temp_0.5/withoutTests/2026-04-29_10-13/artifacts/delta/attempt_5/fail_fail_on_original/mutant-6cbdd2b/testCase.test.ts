import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with retain", () => {
  it("should apply retain optimization only when firstOther has no attributes", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().retain(3);
    const delta3 = new Delta().insert(" world");
    const result = delta1.compose(delta2.compose(delta3));
    expect(result.ops).toEqual([
      { insert: "hello world" }
    ]);
  });
});