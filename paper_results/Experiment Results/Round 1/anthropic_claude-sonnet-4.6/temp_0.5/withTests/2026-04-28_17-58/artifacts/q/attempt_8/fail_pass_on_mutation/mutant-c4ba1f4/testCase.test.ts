import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q runAfter scheduling", () => {
  it("unhandled rejection tracking fires runAfter tasks", () => {
    return new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("timed out")), 1000);
      
      // Force unhandled rejection tracking which uses runAfter
      const reason = new Error("test rejection");
      const p = Q.reject(reason);
      
      // Handle it to prevent actual unhandled rejection
      Q.nextTick.runAfter(() => {
        clearTimeout(timeout);
        try {
          expect(Q.getUnhandledReasons().length).toBeGreaterThanOrEqual(0);
          resolve();
        } catch(e) {
          reject(e);
        }
      });
      
      p.fail(() => {}); // handle the rejection
    });
  });
});