import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of object_defineProperty", () => {
        // Create a promise that is rejected with an error
        const error = new Error('Test error');
        const promise = Q.reject(error);
        
        // Make sure long stack traces are enabled
        Q.longStackSupport = true;
        
        // Expect the error's stack to be an object with a stack property
        return promise.then(null, (err) => {
            expect(Object.getOwnPropertyDescriptor(err, 'stack')).toBeDefined();
        });
    });
});