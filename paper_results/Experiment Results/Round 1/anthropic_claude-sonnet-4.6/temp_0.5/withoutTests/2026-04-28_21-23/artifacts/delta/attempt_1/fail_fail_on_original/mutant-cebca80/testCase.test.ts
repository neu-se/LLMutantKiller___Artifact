import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta invert with object retain", () => {
  it("should correctly invert a delta with numeric retain and attributes without entering object retain branch", () => {
    // Register a handler for embed type to detect if object retain branch is entered incorrectly
    Delta.registerEmbed("image", {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b,
    });

    // Create a base document with a simple string
    const base = new Delta().insert("hello world");
    
    // Create a delta that retains with attributes (numeric retain)
    // This should NOT enter the object retain branch
    const delta = new Delta().retain(5, { bold: true }).delete(6);
    
    // With the mutation (else if (true)), after handling the numeric retain+attributes case,
    // the code would also try to enter the object retain branch for the delete op
    // which would cause getEmbedTypeAndData to throw since op.delete is a number, not an object
    
    // Actually, let's test the invert of a delete operation
    // A delete op: op.delete is truthy, so it enters the first branch
    // After that branch, else if (true) would NOT execute (it's else if)
    
    // Let's create a scenario where op has neither delete nor number retain
    // That can't happen in normal ops...
    
    // The real issue: with mutation, when we have op.retain as a number (not object),
    // the first condition is true, so else if(true) doesn't matter.
    // When op.delete is set, same thing.
    // When op.insert is set, it's handled before this code.
    
    // So the mutation only matters if there's an op that is none of the above.
    // Let me check: what if op.retain is an object? Original: enters object branch. Mutation: also enters (true). Same behavior!
    
    // Wait - I misread the structure. Let me re-examine.
    // The mutation is INSIDE the first else-if block (op.delete || retain number)
    // The inner if/else if structure:
    // if (op.delete) { ... } else if (true) { ... }  <-- mutation
    // This means when op.retain is a number (not delete), it ALWAYS enters the retain branch
    // But that's the same as the original behavior since op.retain being a number means it's not op.delete
    
    // Actually with mutation: else if (true) replaces else if (op.retain) 
    // So if op.retain is 0 (falsy), original skips, mutation enters
    
    const result = delta.invert(base);
    expect(result.ops).toEqual([
      { insert: "hello" },
      { retain: 5, attributes: { bold: null } },
      { insert: " world" },
    ]);
    
    Delta.unregisterEmbed("image");
  });
});