import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey path", () => {
  it("passes resolved value back into generator on next call", (done) => {
    const StopIteration = function(this: any, val: any) { this.value = val; };
    (global as any).StopIteration = StopIteration;

    const asyncFn = Q.async(function() {
      let receivedValue: any;
      return {
        next: function(val: any) {
          if (receivedValue === undefined) {
            receivedValue = val; // first call val is undefined (initial)
            return Q.resolve(42); // yield a promise
          }
          // second call: val should be 42 (resolved value of promise)
          throw new StopIteration(val); // return what we received
        },
        throw: function(e: any) { throw e; }
      };
    });

    asyncFn().then((result: any) => {
      delete (global as any).StopIteration;
      expect(result).toBe(42);
      done();
    }, (err: any) => {
      delete (global as any).StopIteration;
      done(err);
    });
  });
});