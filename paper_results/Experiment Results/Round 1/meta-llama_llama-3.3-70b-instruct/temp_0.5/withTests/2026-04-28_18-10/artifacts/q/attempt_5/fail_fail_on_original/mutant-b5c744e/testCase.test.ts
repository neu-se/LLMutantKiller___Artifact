import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', function() {
    it('should resolve with an empty array when the input array is empty', function() {
        return Q.all([]).then(function(values) {
            expect(values).toEqual([]);
        });
    });
});