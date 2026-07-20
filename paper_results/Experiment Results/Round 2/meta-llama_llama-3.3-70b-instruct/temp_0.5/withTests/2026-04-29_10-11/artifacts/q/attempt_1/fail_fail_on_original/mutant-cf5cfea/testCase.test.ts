import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('coerce function', () => {
    it('should reject the promise if an error occurs in the thenable', () => {
        var thenable = {
            then: function (fulfilled, rejected) {
                throw new Error('Error in thenable');
            }
        };

        return Q(thenable).then(null, function (error) {
            expect(error.message).toBe('Error in thenable');
        });
    });
});