const Q = require("../../../../../../../../../subject_repositories/q/q.js");

describe('coerce function', () => {
    it('should reject the promise if an error is thrown in the then method', () => {
        const thenable = {
            then: function(resolve, reject) {
                throw new Error('Test error');
            }
        };

        const promise = Q(thenable);

        return promise.then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe('Test error');
        });
    });
});