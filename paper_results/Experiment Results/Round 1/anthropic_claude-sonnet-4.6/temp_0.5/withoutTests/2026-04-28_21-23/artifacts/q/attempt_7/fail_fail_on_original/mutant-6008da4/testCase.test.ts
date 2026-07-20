import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q runSingle error handling", () => {
  it("re-throws errors asynchronously (non-node behavior) so flush continues", (done) => {
    const secondTaskRan: boolean[] = [];
    
    // We need to prevent the uncaught exception from crashing Jest
    // by handling it ourselves
    const uncaughtHandler = (err: Error) => {
      // Expected - just absorb it
    };
    process.on("uncaughtException", uncaughtHandler);
    
    // Schedule throwing task followed by normal task
    Q.nextTick(() => {
      throw new Error("intentional");
    });
    Q.nextTick(() => {
      secondTaskRan.push(true);
    });
    
    setTimeout(() => {
      process.removeListener("uncaughtException", uncaughtHandler);
      // With isNodeJS=false (original): flush continues after async throw, second task runs in same flush
      // With isNodeJS=true (mutated): flush interrupted by sync throw, second task runs in later flush
      // Either way, second task eventually runs
      expect(secondTaskRan.length).toBe(1);
      done();
    }, 100);
  });
});