import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise descriptor exception handling", () => {
  it("should reject the promise when a descriptor method throws an exception", async () => {
    const error = new Error("descriptor error");
    
    // Use Q.dispatch which calls promiseDispatch internally
    // Create a fulfilled promise wrapping an object, then call a method that throws
    const obj = {
      throwingMethod: function() {
        throw error;
      }
    };
    
    // Q.post dispatches "post" operation which calls value[name].apply(value, args)
    // If the method throws, it should be caught and result in a rejection
    const result = Q(obj).post("throwingMethod", []);
    
    await expect(result).rejects.toThrow("descriptor error");
  });
});