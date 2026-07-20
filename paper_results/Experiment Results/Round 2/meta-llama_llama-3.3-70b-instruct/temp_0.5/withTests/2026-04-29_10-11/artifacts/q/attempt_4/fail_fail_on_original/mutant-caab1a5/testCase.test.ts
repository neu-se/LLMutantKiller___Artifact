import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.when', function() {
    it('should call the callback when the promise is resolved', function(done) {
        var promise = q(10);
        q.when(promise, function(value: number) {
            expect(value).toBe(10);
            done();
        });
    });
});