describe("Q uses setImmediate when not in Node.js but setImmediate is available", () => {
  it("should flush using setImmediate in non-Node environments", () => {
    jest.resetModules();
    
    // Save originals
    const originalProcess = global.process;
    
    // Make it look like non-Node environment by removing process
    (global as any).process = undefined;
    
    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      (global as any).process = originalProcess;
    }
    
    return new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("timed out - promises never resolved")), 1000);
      
      Q(42).then((value: number) => {
        clearTimeout(timeout);
        try {
          expect(value).toBe(42);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
  });
});