import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise scheduling", () => {
  it("resolves promises before setTimeout(0) fires when MessageChannel is available", (done) => {
    if (typeof MessageChannel === "undefined") {
      done();
      return;
    }

    const order: string[] = [];
    
    // Warm up Q's nextTick mechanism
    const warmup = Q.defer();
    Q.nextTick(() => warmup.resolve(null));
    
    warmup.promise.then(() => {
      // Now Q is warmed up and using MessageChannel (if available)
      // Schedule a setTimeout(0) BEFORE the Q promise resolution
      setTimeout(() => order.push("setTimeout"), 0);
      
      // Resolve a promise - with MessageChannel this fires before setTimeout(0)
      Q.resolve("value").then(() => {
        order.push("promise");
      });
      
      // Check after both should have fired
      setTimeout(() => {
        try {
          expect(order[0]).toBe("promise");
          done();
        } catch (e) {
          done(e);
        }
      }, 100);
    });
  });
});