import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("should emit rejectionHandled event when a tracked rejection is handled", async () => {
    const emittedEvents: string[] = [];
    const originalEmit = process.emit.bind(process);
    
    process.emit = function(event: string, ...args: any[]): boolean {
      emittedEvents.push(event);
      return originalEmit(event, ...args);
    } as typeof process.emit;

    Q.resetUnhandledRejections();

    const deferred = Q.defer();
    const err = new Error("tracked rejection");
    deferred.reject(err);

    // First let the unhandledRejection be reported
    await new Promise(resolve => setTimeout(resolve, 100));

    // Now handle the rejection
    deferred.promise.fail(() => {});

    await new Promise(resolve => setTimeout(resolve, 100));

    process.emit = originalEmit as typeof process.emit;

    expect(emittedEvents).toContain("rejectionHandled");
  });
});