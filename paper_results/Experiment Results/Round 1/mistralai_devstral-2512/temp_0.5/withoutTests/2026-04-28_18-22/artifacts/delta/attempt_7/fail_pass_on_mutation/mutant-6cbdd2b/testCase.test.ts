import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with retain", () => {
  it("should not skip insert operations when composing with a retain that has no attributes", () => {
    const delta1 = new Delta().insert("a").insert("b");
    const delta2 = new Delta().retain(1);
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([{ insert: "ab" }]);
  });
});