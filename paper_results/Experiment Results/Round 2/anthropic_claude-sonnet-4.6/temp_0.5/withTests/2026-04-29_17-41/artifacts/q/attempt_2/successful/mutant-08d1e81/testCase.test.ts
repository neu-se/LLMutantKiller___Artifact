import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit guard", () => {
  it("emits unhandledRejection only when process is an object with emit function", (done) => {
    Q.resetUnhandledRejections();

    const emittedEvents: Array<{ reason: any; promise: any }> = [];
    const handler = (reason: any, promise: any) => {
      emittedEvents.push({ reason, promise });
    };

    process.on("unhandledRejection", handler);

    // Save and replace process.emit to be undefined temporarily during trackRejection call
    // so the original guard prevents scheduling the runAfter
    const originalEmit = process.emit.bind(process);
    const originalProcessEmit = process.emit;

    // Temporarily make process not satisfy the condition
    // We need to make typeof process.emit !== "function" AT THE TIME trackRejection is called
    (process as any).emit = undefined;

    const reason = new Error("test unhandled rejection");
    Q.reject(reason);

    // Restore immediately after
    (process as any).emit = originalProcessEmit;

    setTimeout(() => {
      process.removeListener("unhandledRejection", handler);
      Q.resetUnhandledRejections();

      // Original: process.emit was undefined when trackRejection ran, so runAfter was NOT scheduled,
      //           so no "unhandledRejection" event was emitted
      // Mutated:  condition is always true, so runAfter WAS scheduled,
      //           and process.emit was restored by then, so event IS emitted
      expect(emittedEvents.length).toBe(0);
      done();
    }, 200);
  });
});