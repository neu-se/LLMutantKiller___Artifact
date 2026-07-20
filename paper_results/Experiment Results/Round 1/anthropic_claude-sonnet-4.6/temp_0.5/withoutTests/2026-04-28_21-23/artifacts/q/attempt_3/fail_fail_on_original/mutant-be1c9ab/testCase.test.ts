import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("resolves when exception has [object StopIteration] toString in SpiderMonkey path", async () => {
    (global as any).StopIteration = {};
    
    try {
      const stopIterationException = {
        value: 42,
        toString() { return "[object StopIteration]"; }
      };
      
      // Override Object.prototype.toString temporarily
      const origToString = Object.prototype.toString;
      // We need object_toString(exception) === "[object StopIteration]"
      // object_toString is uncurryThis(Object.prototype.toString)
      // So we need Object.prototype.toString.call(exception) === "[object StopIteration]"
      
      const makeGenerator = function() {
        return {
          next: function() {
            throw stopIterationException;
          }
        };
      };
      
      const result = await Q.async(makeGenerator)();
      expect(result).toBe(42);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});