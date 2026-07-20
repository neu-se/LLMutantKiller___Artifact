const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done() with process.domain", () => {
  it("should handle unhandled errors correctly when process.domain is present", (done) => {
    // Test case 1: process.domain exists but process is not an object
    const mockProcess1 = {
      domain: {
        bind: (fn: Function) => fn,
        enter: () => {},
        exit: () => {}
      },
      nextTick: (fn: Function) => setTimeout(fn, 0)
    };

    // Test case 2: process is an object but process.domain is undefined
    const mockProcess2 = {
      nextTick: (fn: Function) => setTimeout(fn, 0)
    };

    // Temporarily replace global.process
    const originalProcess = global.process;

    // Test with mockProcess1 (should work in original, fail in mutated)
    (global as any).process = mockProcess1;
    let test1Passed = false;

    try {
      const promise1 = Q.reject(new Error("Test error 1"));
      promise1.done(
        () => {},
        (err: Error) => {
          test1Passed = true;
          expect(err.message).toBe("Test error 1");
        }
      );

      setTimeout(() => {
        expect(test1Passed).toBe(true);

        // Test with mockProcess2 (should work in both)
        (global as any).process = mockProcess2;
        let test2Passed = false;

        try {
          const promise2 = Q.reject(new Error("Test error 2"));
          promise2.done(
            () => {},
            (err: Error) => {
              test2Passed = true;
              expect(err.message).toBe("Test error 2");
            }
          );

          setTimeout(() => {
            expect(test2Passed).toBe(true);
            (global as any).process = originalProcess;
            done();
          }, 10);
        } catch (err) {
          (global as any).process = originalProcess;
          done(err);
        }
      }, 10);
    } catch (err) {
      (global as any).process = originalProcess;
      done(err);
    }
  });
});