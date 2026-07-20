describe("Q.async SpiderMonkey path result.done check", () => {
  it("fulfills with QReturnValue.value when result.done was true before exception", (done) => {
    (global as any).StopIteration = {};
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    let callCount = 0;
    const fakeGenerator = {
      next: function(val: any) {
        callCount++;
        if (callCount === 1) {
          // Return done:true so result.done = true
          return { value: 5, done: true };
        }
        if (callCount === 2) {
          // Now throw QReturnValue; result from previous call had done:true
          try { Q["return"](42); } catch(e) { throw e; }
        }
        // Safety: never get here
        return { value: undefined, done: true };
      },
      throw: function(e: any) { throw e; }
    };

    const asyncFn = Q.async(function() {
      return fakeGenerator;
    });

    asyncFn().then(
      (value: unknown) => {
        delete (global as any).StopIteration;
        expect(value).toBe(42);
        done();
      },
      (err: unknown) => {
        delete (global as any).StopIteration;
        done(new Error("Expected fulfillment with 42 but got rejection: " + err));
      }
    );
  });
});