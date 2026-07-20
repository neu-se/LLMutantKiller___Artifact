import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise resolution with setImmediate", () => {
  it("should resolve promises even when setImmediate is defined", () => {
    // Temporarily ensure setImmediate is defined (it is in Node.js)
    // The mutation makes the setImmediate branch empty, leaving requestTick as
    // process.nextTick(flush) - but wait, process.nextTick(flush) CALLS flush immediately
    // not assigns a function. So requestTick would be undefined (return value of process.nextTick).
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => reject(new Error("Timed out - promises never resolved")), 1000);
      
      Q(42).then((value: number) => {
        try {
          expect(value).toBe(42);
          resolve();
        } catch(e) {
          reject(e);
        }
      });
    });
  });
});