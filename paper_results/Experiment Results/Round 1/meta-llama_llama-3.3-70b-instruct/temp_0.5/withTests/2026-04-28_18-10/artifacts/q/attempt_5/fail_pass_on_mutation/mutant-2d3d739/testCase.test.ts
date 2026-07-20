import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of object_defineProperty", () => {
        // Create a promise that is resolved with an object
        const promise = Q.resolve({ foo: 'bar' });
        
        // Use the `dispatch` method to set a property on the object
        const resultPromise = promise.dispatch('set', ['foo', 'baz']);
        
        // Expect the property to be set
        return resultPromise.then(() => {
            return promise.get('foo').then((value) => {
                expect(value).toBe('baz');
            });
        });
    });
});