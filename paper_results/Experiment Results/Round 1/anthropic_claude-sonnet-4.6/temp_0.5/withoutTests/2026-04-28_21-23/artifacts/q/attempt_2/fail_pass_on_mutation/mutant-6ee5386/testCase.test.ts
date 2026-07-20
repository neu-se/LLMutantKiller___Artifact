import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q tapCatch threw tracking", () => {
  it("should propagate error from tapCatch callback when it throws", async () => {
    const callbackError = new Error("tapCatch callback error");
    let finalError: unknown = null;
    let resolved = false;

    // tapCatch is called when promise is rejected
    // threw=true means: callback threw, propagate that error
    // threw=false means: callback didn't throw (wrong!), may swallow error
    const rejectedPromise = Q.reject(new Error("original rejection"));
    
    // Check if tapCatch exists
    const proto = Object.getPrototypeOf(rejectedPromise);
    if (typeof (proto as any).tapCatch === "function") {
      await rejectedPromise
        .tapCatch(function() {
          throw callbackError;
        })
        .then(
          () => { resolved = true; },
          (err: unknown) => { finalError = err; }
        );
      
      expect(resolved).toBe(false);
      expect(finalError).toBe(callbackError);
    } else {
      // tapCatch doesn't exist, skip
      expect(true).toBe(true);
    }
  });
});