import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey generators path", () => {
  it("passes the resolved value of a yielded promise back into the generator", (done) => {
    function StopIteration(this: any, val: any) { this.value = val; }
    StopIteration.prototype[Symbol.toStringTag] = "StopIteration";
    (global as any).StopIteration = StopIteration;

    const asyncFn = Q.async(function() {
      let firstCall = true;
      return {
        next: function(val: any) {
          if (firstCall) {
            firstCall = false;
            return Q.resolve(42);
          }
          throw new (StopIteration as any)(val);
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