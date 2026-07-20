import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of object_defineProperty", () => {
        // Create a promise
        const deferred = Q.defer();
        const promise = deferred.promise;
        
        // Make sure long stack traces are enabled
        Q.longStackSupport = true;
        
        // Resolve the promise
        deferred.resolve();
        
        // Expect the promise to have a stack property
        expect(promise.stack).toBeDefined();
    });
});