import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("mutation detection", () => {
  it("longStackSupport does not reduce the number of stack frames", async () => {
    // Get stack without longStackSupport  
    Q.longStackSupport = false;
    let framesWithout = 0;
    const err1 = new Error("test");
    await new Promise<void>((resolve) => {
      const d = Q.defer();
      d.promise.then(null, (e: any) => {
        framesWithout = (e.stack || "").split('\n').filter((l: string) => /^\s+at\s/.test(l)).length;
        resolve();
      });
      d.reject(err1);
    });

    // Get stack with longStackSupport
    Q.longStackSupport = true;
    let framesWithLong = 0;
    const err2 = new Error("test");
    try {
      await new Promise<void>((resolve) => {
        const d = Q.defer();
        d.promise.then(null, (e: any) => {
          framesWithLong = (e.stack || "").split('\n').filter((l: string) => /^\s+at\s/.test(l)).length;
          resolve();
        });
        d.reject(err2);
      });
    } finally {
      Q.longStackSupport = false;
    }

    // With original: longStackSupport adds promise frames (from non-q.js files) 
    //   → framesWithLong >= framesWithout
    // With mutation: longStackSupport filters MORE frames than it adds
    //   → framesWithLong < framesWithout (if test file frames have small line numbers)
    expect(framesWithLong).toBeGreaterThanOrEqual(framesWithout);
  });
});