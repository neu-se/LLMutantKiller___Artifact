import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta.diff", () => {
  it("should correctly diff when other has a single long op but diff INSERT segment is shorter", () => {
    // a = "World", b = "Hello World"
    // diff: INSERT "Hello ", EQUAL "World"
    // b's ops: single insert("Hello World") with peekLength=11
    // When processing INSERT "Hello " (length=6): otherIter.peekLength()=11 > 6
    // Math.min(11,6)=6 (correct), Math.max(11,6)=11 (wrong)
    const a = new Delta().insert("World");
    const b = new Delta().insert("Hello World");

    const result = a.diff(b);
    const composed = a.compose(result);

    expect(composed.ops).toEqual(new Delta().insert("Hello World").ops);
  });
});