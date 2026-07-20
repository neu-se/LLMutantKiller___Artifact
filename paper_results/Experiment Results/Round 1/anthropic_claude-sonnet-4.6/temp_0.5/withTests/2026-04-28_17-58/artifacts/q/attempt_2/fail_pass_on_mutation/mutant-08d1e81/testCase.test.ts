import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection mutation detection", () => {
  it("should only schedule unhandledRejection emit when process is an object with emit function", (done) => {
    Q.resetUnhandledRejections();

    const emittedEvents: string[] = [];
    const originalEmit = process.emit.bind(process);

    // Intercept process.emit to track what events are emitted
    process.emit = function(event: string, ...args: any[]): boolean {
      if (event === "unhandledRejection") {
        emittedEvents.push(event);
      }
      return originalEmit(event, ...args);
    } as typeof process.emit;

    // Create a rejection and immediately handle it (chain .fail)
    // so it gets untracked before runAfter fires
    const err = new Error("handled rejection");
    Q.reject(err).fail(() => { /* handled */ });

    // After enough time for runAfter to have fired
    setTimeout(() => {
      process.emit = originalEmit;
      Q.resetUnhandledRejections();
      // Since the rejection was handled, unhandledRejection should NOT have been emitted
      expect(emittedEvents.length).toBe(0);
      done();
    }, 200);
  });
});