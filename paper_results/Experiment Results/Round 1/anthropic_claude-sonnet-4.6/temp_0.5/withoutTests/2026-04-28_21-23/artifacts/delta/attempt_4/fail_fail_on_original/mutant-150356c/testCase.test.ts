import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("should correctly compose retain followed by insert with a leading retain that covers both", () => {
    // this: retain(2) + insert("ab") — affects 4 chars total (2 retained + 2 inserted)
    // other: retain(4) + delete(1) — retain 4, then delete 1
    const delta1 = new Delta().retain(2).insert("ab");
    const delta2 = new Delta().retain(4).delete(1);
    const result = delta1.compose(delta2);
    // Expected: retain(2) + insert("a") + delete(1)
    // (insert "ab" composed with retain(2)+delete(1) = insert("a") + delete(1))
    const expected = new Delta().retain(2).insert("a").delete(1);
    expect(result.ops).toEqual(expected.ops);
  });
});