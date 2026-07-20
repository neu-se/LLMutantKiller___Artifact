import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise library', () => {
    it('should handle promise resolution correctly', (done) => {
        var promise = Q(42);
        var fulfilled = false;
        promise.then(function (value: any) {
            fulfilled = true;
            expect(value).toBe(42);
        });
        promise.done(function () {
            expect(fulfilled).toBe(true);
            done();
        }, function () {
            expect(true).toBe(false);
            done();
        });
    });
});