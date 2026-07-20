import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise library', () => {
    it('should handle promise resolution correctly', () => {
        var promise = Q(42);
        var fulfilled = false;
        var rejected = false;
        promise.then(function (value) {
            fulfilled = true;
            expect(value).toBe(42);
        }, function (reason) {
            rejected = true;
        });
        expect(fulfilled).toBe(true);
        expect(rejected).toBe(false);
    });
});