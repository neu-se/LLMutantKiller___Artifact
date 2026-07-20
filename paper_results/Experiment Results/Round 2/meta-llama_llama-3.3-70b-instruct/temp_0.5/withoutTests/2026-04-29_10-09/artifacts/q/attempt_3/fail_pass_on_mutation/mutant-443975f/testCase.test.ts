import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should resolve promise', (done) => {
        const promise = Q(1);
        promise.then((value) => {
            expect(value).toBe(1);
            done();
        });
    });
});