import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise library', () => {
    it('should handle promise resolution correctly', (done) => {
        var promise = Q(42);
        var thenCalled = false;
        promise.then(function (value: any) {
            thenCalled = true;
            expect(value).toBe(42);
        });
        promise.done(function (value: any) {
            if (thenCalled) {
                expect(value).toBe(42);
            } else {
                expect(true).toBe(false);
            }
        }, function () {}, function () {});
        setTimeout(function () {
            expect(thenCalled).toBe(true);
            done();
        }, 10);
    });
});