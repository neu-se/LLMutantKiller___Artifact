import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta.diff with insert components", () => {
  it("should correctly diff two deltas where inserted text spans multiple ops", () => {
    // Create a base delta with some text
    const a = new Delta().insert("Hello");
    
    // Create a target delta with different text that will produce INSERT diff components
    // where otherIter.peekLength() < length at some point
    const b = new Delta().insert("He").insert("llo World");
    
    // The diff should produce a delta that when applied to `a` gives `b`
    const result = a.diff(b);
    
    // Verify the result is correct by checking it transforms a into b
    const composed = a.compose(result);
    
    // The composed result should equal b
    expect(composed.ops).toEqual(new Delta().insert("Hello World").ops);
  });
});