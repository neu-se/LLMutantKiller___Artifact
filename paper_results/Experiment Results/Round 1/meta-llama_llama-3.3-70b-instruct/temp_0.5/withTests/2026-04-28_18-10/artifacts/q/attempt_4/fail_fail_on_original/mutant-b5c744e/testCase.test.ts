import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', function() {
    it('should reject with an error when the input array is empty', function() {
        return Q.all([]).then(function(values) {
            expect(true).toBe(false);
        }, function(error) {
            expect(error).toBeUndefined();
        });
    });
});