import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject the promise when an exception is thrown in the thenable', () => {
        const thenable = {
            then: function(resolve, reject) {
                throw new Error('Test error');
            }
        };

        const promise = Q(thenable);
        expect(promise).rejects.toThrow('Test error');
    });
});