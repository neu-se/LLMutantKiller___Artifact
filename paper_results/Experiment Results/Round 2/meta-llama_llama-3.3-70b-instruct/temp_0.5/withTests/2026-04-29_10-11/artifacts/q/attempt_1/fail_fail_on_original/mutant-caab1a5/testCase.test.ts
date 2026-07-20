import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.when', function() {
    it('should call the callback when the promise is resolved', function() {
        var called = false;
        var promise = Q(10);
        Q.when(promise, function(value) {
            called = true;
            expect(value).toBe(10);
        });
        expect(called).toBe(true);
    });
});