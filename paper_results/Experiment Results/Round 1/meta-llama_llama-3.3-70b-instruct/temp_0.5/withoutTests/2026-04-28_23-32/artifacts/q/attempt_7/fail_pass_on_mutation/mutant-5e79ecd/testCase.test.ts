import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise library', () => {
    it('should handle promise resolution correctly', (done) => {
        var promise = Q(42);
        var thenCalled = false;
        var doneCalled = false;
        promise.then(function (value: any) {
            thenCalled = true;
            expect(value).toBe(42);
        });
        promise.done(function () {
            doneCalled = true;
        }, function () {}, function () {});
        setTimeout(function () {
            expect(thenCalled).toBe(true);
            expect(doneCalled).toBe(true);
            done();
        }, 10);
    });
});