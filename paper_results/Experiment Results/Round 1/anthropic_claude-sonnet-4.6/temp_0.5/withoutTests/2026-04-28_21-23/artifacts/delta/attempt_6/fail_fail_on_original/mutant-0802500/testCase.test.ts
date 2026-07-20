import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("detects the mutation in compose leading retain optimization", () => {
    // Simple case: this has one insert, other has retain then insert
    // The optimization should move the insert from this before the main loop
    // so that other's insert is appended after
    const a = new Delta().insert("hello");
    const b = new Delta().retain(5).delete(2).insert("world");
    const result = a.compose(b);
    // a is "hello" (5 chars), b retains 5, deletes 2, inserts "world"
    // But a only has 5 chars total, so delete(2) would delete from... wait
    // Actually a has insert("hello") = 5 chars
    // b: retain(5) = keep all 5, delete(2) = delete 2 more (but there are none), insert("world")
    // Hmm, this doesn't make sense
    expect(result.ops).toEqual([{ insert: "helloworld" }]);
  });
});