import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of object_defineProperty", () => {
        // Create a promise that is resolved with an object
        const promise = Q({ foo: 'bar' });
        
        // Use the `get` method to retrieve the `foo` property
        const resultPromise = promise.get('foo');
        
        // Expect the result to be 'bar'
        resultPromise.then((result) => {
            expect(result).toBe('bar');
        });
    });
});