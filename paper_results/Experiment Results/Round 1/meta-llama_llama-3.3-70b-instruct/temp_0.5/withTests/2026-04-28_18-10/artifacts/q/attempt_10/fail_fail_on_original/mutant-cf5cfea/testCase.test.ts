import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('coerce function', () => {
    it('should reject the promise if an error is thrown in the then method', () => {
        const thenable = {
            then: function(resolve: any, reject: any) {
                try {
                    throw new Error('Test error');
                } catch (e) {
                    // Do not call reject
                }
            }
        };

        const promise = Q(thenable);

        return promise.then(() => {
            expect(true).toBe(false);
        }, (error: any) => {
            expect(true).toBe(false);
        });
    });
});