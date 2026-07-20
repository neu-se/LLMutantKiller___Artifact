import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should reject with a regular error thrown in a SpiderMonkey-style generator, not treat it as StopIteration", () => {
    // Force the SpiderMonkey path by defining StopIteration globally
    const globalAny = global as any;
    const hadStopIteration = "StopIteration" in globalAny;
    const originalStopIteration = globalAny.StopIteration;

    // Define a fake StopIteration to trigger the SpiderMonkey branch in Q.async
    globalAny.StopIteration = {};

    const regularError = new Error("not a stop iteration");

    // Create a fake SpiderMonkey-style generator (object with next/throw methods)
    function fakeGeneratorMaker() {
      let called = false;
      return {
        next: function() {
          if (!called) {
            called = true;
            throw regularError;
          }
        },
        throw: function(e: any) {
          throw e;
        }
      };
    }

    // Q.async calls makeGenerator.apply(this, arguments) to get the generator
    const asyncFn = Q.async(fakeGeneratorMaker);

    return asyncFn().then(
      (val: any) => {
        // Restore StopIteration
        if (hadStopIteration) {
          globalAny.StopIteration = originalStopIteration;
        } else {
          delete globalAny.StopIteration;
        }
        throw new Error("Should have been rejected but got fulfilled with: " + val);
      },
      (err: any) => {
        // Restore StopIteration
        if (hadStopIteration) {
          globalAny.StopIteration = originalStopIteration;
        } else {
          delete globalAny.StopIteration;
        }
        // Original: regularError is NOT StopIteration, so it should be rejected with it
        expect(err).toBe(regularError);
      }
    );
  });
});