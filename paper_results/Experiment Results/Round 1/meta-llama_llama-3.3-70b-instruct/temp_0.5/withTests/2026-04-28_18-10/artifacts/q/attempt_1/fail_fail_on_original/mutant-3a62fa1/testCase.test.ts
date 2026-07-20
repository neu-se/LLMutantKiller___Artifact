import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should resolve promise with Node.js environment', () => {
        // Since we are in a Node.js environment, process should be an object
        expect(typeof process).toBe('object');
        
        // The mutation changes the condition to always true, so the promise should resolve
        const promise = Q.defer();
        Q.nextTick(() => {
            promise.resolve('resolved');
        });
        
        return promise.promise.then((value) => {
            expect(value).toBe('resolved');
        });
    });
});