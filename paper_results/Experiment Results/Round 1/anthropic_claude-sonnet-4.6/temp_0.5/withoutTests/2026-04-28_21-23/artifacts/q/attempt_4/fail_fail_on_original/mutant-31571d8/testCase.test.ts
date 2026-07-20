import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
  it("should add multiple promise stacks to error, producing multiple separators", (done) => {
    Q.longStackSupport = true;

    // We need a chain long enough that the source chain has at least 3 promises
    // so that the loop can add 2 stacks (original) vs 1 stack (mutation)
    // resulting in 2 separators (original) vs 1 separator (mutation)
    const chain = Q.resolve(1)
      .then(function step1() { return Q.resolve(2); })
      .then(function step2() { return Q.resolve(3); })
      .then(function step3() { return Q.resolve(4); })
      .then(function step4() { throw new Error("deliberate"); });

    chain.fail(function(err: any) {
      try {
        const stack: string = err.stack || "";
        const separatorCount = (stack.match(/From previous event:/g) || []).length;
        // Original: loop walks source chain adding multiple stacks → >=2 separators
        // Mutation: loop only adds 1 stack → exactly 1 separator
        expect(separatorCount).toBeGreaterThanOrEqual(2);
        done();
      } catch(e) {
        done(e);
      }
    });
  });
});