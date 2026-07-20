import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with retain", () => {
  it("should not apply retain optimization when firstOther has non-numeric retain", () => {
    const delta1 = new Delta().insert("hello");
    const delta2 = new Delta().retain({ embed: "test" });
    const result = delta1.compose(delta2);
    expect(result.ops).toEqual([
      { insert: "hello" },
      { retain: { embed: "test" } }
    ]);
  });
});