import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.when', function() {
    it('should call the callback when the promise is resolved', function(done) {
        var promise = Q(10);
        Q.when(promise, function(value) {
            expect(value).toBe(10);
            done();
        });
    });
});