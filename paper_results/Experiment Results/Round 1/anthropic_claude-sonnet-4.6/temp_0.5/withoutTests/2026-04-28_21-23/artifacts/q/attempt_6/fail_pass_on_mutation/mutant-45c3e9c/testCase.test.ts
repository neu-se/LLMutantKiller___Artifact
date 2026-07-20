import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick flushing flag reset", () => {
  it("should trigger requestTick when flushing is false and new task is added after previous flush", () => {
    return new Promise<void>((resolve, reject) => {
      let count = 0;
      const expected = 3;
      
      // Use setImmediate to ensure we're outside any current flush
      setImmediate(() => {
        // At this point flushing should be false
        // Queue tasks - with mutation, requestTick never called
        Q.nextTick(() => { count++; });
        Q.nextTick(() => { count++; });
        Q.nextTick(() => { 
          count++;
          if (count === expected) {
            resolve();
          } else {
            reject(new Error(`Expected ${expected} tasks but got ${count}`));
          }
        });
      });
      
      setTimeout(() => reject(new Error("Timed out")), 1000);
    });
  });
});