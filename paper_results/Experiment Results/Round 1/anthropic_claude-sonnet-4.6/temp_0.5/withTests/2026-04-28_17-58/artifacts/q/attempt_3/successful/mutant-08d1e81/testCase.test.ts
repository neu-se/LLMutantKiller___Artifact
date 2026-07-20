import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection", () => {
  it("does not call process.emit when process.emit is not a function", (done) => {
    Q.resetUnhandledRejections();

    const originalEmit = process.emit;
    
    // Track calls to a spy
    let emitCallCount = 0;
    const spyEmit = function(event: string, ...args: any[]): boolean {
      if (event === "unhandledRejection") {
        emitCallCount++;
      }
      return originalEmit.call(process, event, ...args);
    } as typeof process.emit;

    // Replace emit AFTER rejection is created but BEFORE runAfter fires
    // First: remove emit so condition is false
    (process as any).emit = undefined;
    
    Q.reject(new Error("test"));
    
    // Now restore with spy - runAfter hasn't fired yet
    (process as any).emit = spyEmit;

    setTimeout(() => {
      process.emit = originalEmit;
      Q.resetUnhandledRejections();
      // Original: condition checked at rejection time, was false -> runAfter not scheduled -> emitCallCount = 0
      // Mutated: always true -> runAfter scheduled -> emit called with spy -> emitCallCount = 1
      expect(emitCallCount).toBe(0);
      done();
    }, 300);
  });
});