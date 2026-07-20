import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization for leading inserts", () => {
  it("should move insert ops before a leading retain when composing", () => {
    // this delta has inserts followed by more content
    // other delta starts with a retain that covers the inserts
    // The optimization should preserve the inserts at the front
    
    const thisDelta = new Delta()
      .insert("hello")
      .insert(" world");
    
    const otherDelta = new Delta()
      .retain(11)
      .insert("!");
    
    // When composing, the optimization moves inserts from `this` to the front
    // before processing the retain in `other`
    // Result should be: insert("hello world") + insert("!")
    const result = thisDelta.compose(otherDelta);
    
    // Expected: the text "hello world!" 
    const expected = new Delta()
      .insert("hello world!")
    
    expect(result).toEqual(expected);
  });
});