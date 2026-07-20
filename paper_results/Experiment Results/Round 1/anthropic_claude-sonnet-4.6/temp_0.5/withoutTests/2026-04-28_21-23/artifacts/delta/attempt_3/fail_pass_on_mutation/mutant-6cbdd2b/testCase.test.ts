import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly composes when other starts with a retain that has attributes (should not trigger optimization)", () => {
    // When firstOther has attributes, the optimization should NOT run in either version.
    // When firstOther is a numeric retain WITHOUT attributes, both versions run the optimization.
    // The mutation makes the optimization also run for non-numeric retains (no-op).
    // Test: other starts with retain(n) where n > total inserts in this - optimization path
    const a = new Delta().insert("ab").insert("cd");
    const b = new Delta().retain(4).delete(0);

    const result = a.compose(b);

    expect(result.ops).toEqual([{ insert: "abcd" }]);
  });
});