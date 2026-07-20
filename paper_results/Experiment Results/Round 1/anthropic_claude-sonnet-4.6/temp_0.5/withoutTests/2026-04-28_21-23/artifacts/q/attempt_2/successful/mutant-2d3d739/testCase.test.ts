import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_defineProperty mutation detection", () => {
  it("should define __minimumStackCounter__ on error during long stack trace building", async () => {
    Q.longStackSupport = true;
    
    try {
      // Create a chain so the promise has a .stack property
      const deferred = Q.defer();
      const error = new Error("test");
      
      // The rejection handler triggers makeStackTraceLong which calls object_defineProperty
      // With the mutation (object_defineProperty = false), this will throw TypeError
      let caughtError: any = null;
      
      const p = deferred.promise
        .then(function() { return 1; })
        .then(null, function(err) {
          // If we get here, object_defineProperty worked
          return "ok";
        });
      
      deferred.reject(error);
      
      const result = await p;
      expect(result).toBe("ok");
    } finally {
      Q.longStackSupport = false;
    }
  });
});