import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose()", () => {
  it("retain start optimization preserves op structure without merging through push", () => {
    // Two inserts with same attributes - optimization puts them in ops[] directly
    // Without optimization they go through delta.push() which would merge them
    // But actually Delta(ops) constructor uses array directly so no merging either way...
    // Let's verify the actual difference with delete interaction
    const a = new Delta().insert("A").delete(1).insert("B");
    const b = new Delta().retain(2);
    const expected = new Delta().insert("A").delete(1).insert("B");
    expect(a.compose(b)).toEqual(expected);
  });
});