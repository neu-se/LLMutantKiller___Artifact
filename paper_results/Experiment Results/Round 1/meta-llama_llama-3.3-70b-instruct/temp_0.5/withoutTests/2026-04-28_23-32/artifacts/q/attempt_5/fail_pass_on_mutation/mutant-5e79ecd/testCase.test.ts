import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise library', () => {
    it('should handle promise resolution correctly', (done) => {
        var promise = Q(42);
        promise.done(function (value: any) {
            expect(value).toBe(42);
            done();
        }, function (error: any) {
            expect(true).toBe(false);
            done();
        }, function (progress: any) {
            expect(true).toBe(false);
            done();
        });
    });
});