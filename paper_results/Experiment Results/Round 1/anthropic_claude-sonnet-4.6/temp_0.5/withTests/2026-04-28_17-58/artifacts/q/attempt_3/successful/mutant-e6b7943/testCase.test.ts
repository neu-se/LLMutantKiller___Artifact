import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration always returning true", () => {
  it("detects mutation by checking that regular errors cause rejection not fulfillment in SpiderMonkey async path", () => {
    // We need to verify isStopIteration behavior
    // The only way to trigger it is via Q.async SpiderMonkey path
    // which requires StopIteration to be defined globally
    
    // First verify StopIteration is not defined (normal Node env)
    // Then set it to force the SpiderMonkey path
    const originalStopIteration = (global as any).StopIteration;
    (global as any).StopIteration = { name: "StopIteration" };
    
    const realError = new TypeError("this is a real type error");
    
    // makeGenerator returns a SpiderMonkey-style generator
    const asyncFn = Q.async(function() {
      let done = false;
      return {
        next: function(val: any) {
          if (!done) {
            done = true;
            // Return a value first time (simulates yield)
            return Q.resolve(1); // this gets passed to when()
          }
          throw realError;
        },
        send: function(val: any) {
          return this.next(val);
        }
      };
    });
    
    return asyncFn()
      .then(
        function(val: any) {
          (global as any).StopIteration = originalStopIteration;
          throw new Error("Expected rejection but got: " + JSON.stringify(val));
        },
        function(err: any) {
          (global as any).StopIteration = originalStopIteration;
          expect(err).toBe(realError);
        }
      );
  });
});