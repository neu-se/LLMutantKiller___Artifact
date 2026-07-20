import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q isNodeJS mutation - runSingle behavior", () => {
  it("should continue processing subsequent tasks after a task throws (non-Node behavior)", (done) => {
    const results: string[] = [];
    const uncaughtErrors: Error[] = [];
    
    const uncaughtHandler = (err: Error) => { uncaughtErrors.push(err); };
    process.on("uncaughtException", uncaughtHandler);

    // Schedule a task that throws
    Q.nextTick(() => { throw new Error("task error"); });
    // Schedule a subsequent task
    Q.nextTick(() => { results.push("second"); });

    setTimeout(() => {
      process.removeListener("uncaughtException", uncaughtHandler);
      // With isNodeJS=false (original): second task runs in same flush (throw goes to setTimeout)
      // With isNodeJS=true (mutated): second task deferred, but still runs eventually
      // The difference: with isNodeJS=true the throw propagates through process.nextTick synchronously
      // causing uncaughtException, AND interrupts the flush loop
      expect(results).toContain("second");
      expect(uncaughtErrors).toHaveLength(0); // original: no uncaught (rethrown via setTimeout)
      done();
    }, 200);
  });
});