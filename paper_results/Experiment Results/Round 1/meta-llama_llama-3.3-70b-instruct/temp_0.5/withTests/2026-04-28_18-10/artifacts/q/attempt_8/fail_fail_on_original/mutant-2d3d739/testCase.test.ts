import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of object_defineProperty", () => {
        // Create a promise
        const promise = Q.defer().promise;
        
        // Make sure long stack traces are enabled
        Q.longStackSupport = true;
        
        // Expect the promise to have a stack property
        return promise.then(() => {
            expect(Object.getOwnPropertyDescriptor(promise, 'stack')).toBeDefined();
        });
    });
});