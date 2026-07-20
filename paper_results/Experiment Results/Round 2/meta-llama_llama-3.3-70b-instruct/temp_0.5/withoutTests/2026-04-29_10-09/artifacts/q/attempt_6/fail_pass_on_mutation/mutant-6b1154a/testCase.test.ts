import q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle done method correctly', (done) => {
        const promise = q(1);
        let result: any;
        promise.done((value) => {
            result = value;
            expect(result).toBe(1);
            expect(promise.then).toBeInstanceOf(Function);
            done();
        }, (error) => {
            throw error;
        }, () => {});
    });
});