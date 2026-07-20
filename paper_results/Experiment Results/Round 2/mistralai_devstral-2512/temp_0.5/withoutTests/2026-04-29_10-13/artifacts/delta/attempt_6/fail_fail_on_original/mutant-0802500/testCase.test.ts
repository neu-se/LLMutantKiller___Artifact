import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with retain optimization", () => {
  it("should correctly optimize when composing with retain followed by insert", () => {
    const delta1 = new Delta().insert("abc");
    const delta2 = new Delta().retain(2);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([
      { retain: 2 },
      { insert: "c" }
    ]);
  });
});