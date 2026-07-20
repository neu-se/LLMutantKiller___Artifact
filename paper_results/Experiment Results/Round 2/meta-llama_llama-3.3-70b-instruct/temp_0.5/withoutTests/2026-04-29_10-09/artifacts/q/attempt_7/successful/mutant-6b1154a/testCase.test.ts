import q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle done method correctly', (done) => {
        const promise = q(1);
        promise.done((value) => {
            expect(value).toBe(1);
            expect(promise.inspect().state).toBe('fulfilled');
            done();
        }, (error) => {
            throw error;
        }, () => {});
    });
});