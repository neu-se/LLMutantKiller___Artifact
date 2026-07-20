import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("should call process.emit with rejectionHandled when a reported rejection is handled", (done) => {
    Q.resetUnhandledRejections();

    const emitCalls: Array<{ event: string; args: any[] }> = [];
    const originalEmit = process.emit.bind(process);
    
    // Spy on process.emit
    (process as any).emit = function(event: string, ...args: any[]) {
      emitCalls.push({ event, args });
      return originalEmit(event, ...args);
    };

    // Suppress unhandledRejection to avoid test noise
    process.on("unhandledRejection", () => {});

    const reason = new Error("test rejection");
    const rejectedPromise = Q.reject(reason);

    // Wait for unhandledRejection to be emitted (runAfter fires after nextTick tasks)
    // then handle the rejection
    setTimeout(() => {
      // Handle the rejection now that it's been "reported"
      rejectedPromise.then(null, function() {});

      setTimeout(() => {
        process.emit = originalEmit as any;
        process.removeAllListeners("unhandledRejection");

        const rejectionHandledCalls = emitCalls.filter(c => c.event === "rejectionHandled");
        expect(rejectionHandledCalls.length).toBeGreaterThan(0);
        done();
      }, 500);
    }, 500);
  }, 10000);
});