import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done", () => {
  it("should untrack rejection within one tick when called with no callbacks", () => {
    Q.resetUnhandledRejections();
    
    const reason = new Error("test rejection");
    
    // Mock process.emit to suppress the specific uncaughtException from onUnhandledError
    const originalEmit = process.emit.bind(process);
    const emitMock = jest.spyOn(process, 'emit').mockImplementation(
      function(event: string, ...args: any[]) {
        if (event === 'uncaughtException' && args[0] === reason) {
          return true; // suppress
        }
        if (event === 'unhandledRejection' && args[0] === reason) {
          return true; // suppress
        }
        return originalEmit(event, ...args);
      }
    );
    
    Q.reject(reason).done();
    
    return new Promise<void>((resolve, reject) => {
      Q.nextTick(function() {
        emitMock.mockRestore();
        try {
          expect(Q.getUnhandledReasons().length).toBe(0);
          resolve();
        } catch(e) {
          reject(e);
        }
      });
    });
  });
});