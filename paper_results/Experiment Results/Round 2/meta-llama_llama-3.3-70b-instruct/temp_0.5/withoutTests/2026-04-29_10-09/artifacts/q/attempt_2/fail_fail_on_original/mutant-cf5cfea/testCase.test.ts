import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject the promise when an exception is thrown in the thenable', () => {
        const thenable = {
            then: (resolve: (value: any) => void, reject: (reason: any) => void) => {
                throw new Error('Test error');
            }
        };

        const promise = Q(thenable);
        if (promise instanceof Promise) {
            expect(promise).rejects.toThrow('Test error');
        } else {
            throw new Error('Q did not return a promise');
        }
    });
});