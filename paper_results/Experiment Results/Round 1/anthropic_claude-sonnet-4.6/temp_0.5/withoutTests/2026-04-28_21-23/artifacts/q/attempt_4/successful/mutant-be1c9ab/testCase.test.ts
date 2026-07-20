import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("resolves with exception.value when exception toString is [object StopIteration]", async () => {
    (global as any).StopIteration = {};
    
    try {
      const stopException = {
        value: 99,
        [Symbol.toStringTag]: "StopIteration"
      };
      
      const makeGenerator = function() {
        return {
          next: function() {
            throw stopException;
          }
        };
      };
      
      const result = await Q.async(makeGenerator)();
      expect(result).toBe(99);
    } finally {
      delete (global as any).StopIteration;
    }
  });
});