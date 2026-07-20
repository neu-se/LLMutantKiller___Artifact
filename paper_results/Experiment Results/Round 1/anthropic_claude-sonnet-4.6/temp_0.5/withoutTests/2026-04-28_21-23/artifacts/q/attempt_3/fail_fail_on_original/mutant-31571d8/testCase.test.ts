import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should include stacks from all promises in the chain, not just the first", (done) => {
    Q.longStackSupport = true;

    // Build a chain where source links will be established
    // Each .then() creates a new deferred promise with a source link
    const base = Q.resolve(1)
      .then(function a() { return 2; })
      .then(function b() { return 3; })
      .then(function c() { return 4; })
      .then(function d() { return 5; })
      .then(function e() { throw new Error("test error"); });

    base.fail(function(err: any) {
      try {
        const stack: string = err.stack || "";
        // With original: multiple promise stacks are concatenated
        // (the loop continues adding stacks as long as p.stackCounter < __minimumStackCounter__)
        // With mutation: only the FIRST stack in the source chain is added,
        // then the condition short-circuits to false for all subsequent ones
        const separatorCount = (stack.match(/From previous event:/g) || []).length;
        
        // The chain has 5 .then() calls, so there should be multiple source links
        // and thus multiple "From previous event:" separators
        expect(separatorCount).toBeGreaterThanOrEqual(3);
        done();
      } catch(e) {
        done(e);
      }
    }).done();
  });
});