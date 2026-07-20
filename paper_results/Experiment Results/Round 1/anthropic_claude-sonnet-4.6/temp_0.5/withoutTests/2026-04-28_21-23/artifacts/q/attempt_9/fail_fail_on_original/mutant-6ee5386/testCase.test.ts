import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q threw mutation", () => {
  it("detects mutation via uncaught exception behavior", async () => {
    const progressError = new Error("progress error");
    let uncaughtCount = 0;

    // Spy on process.emit to intercept uncaughtException
    const originalEmit = process.emit.bind(process);
    const emitSpy = jest.spyOn(process, 'emit').mockImplementation((event, ...args) => {
      if (event === 'uncaughtException' && args[0] === progressError) {
        uncaughtCount++;
        return true; // prevent default behavior
      }
      return originalEmit(event, ...args);
    });

    try {
      const deferred = Q.defer();
      
      deferred.promise.then(
        (v: unknown) => v,
        null,
        function() { throw progressError; }
      );

      deferred.notify("trigger");
      deferred.resolve(42);

      await new Promise(resolve => setTimeout(resolve, 100));
    } finally {
      emitSpy.mockRestore();
    }

    // Original (threw=true): error is re-thrown as uncaught → uncaughtCount = 1
    // Mutated (threw=false): error is swallowed → uncaughtCount = 0
    expect(uncaughtCount).toBe(1);
  });
});