import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise library', () => {
    it('should handle promise resolution correctly', (done) => {
        var promise = Q(42);
        promise.then(function (value: any) {
            expect(value).toBe(42);
            done();
        });
    });
});