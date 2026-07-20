import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', () => {
    it('should handle exceptions correctly', () => {
        const asyncFunction = Q.async(function* () {
            try {
                yield Q.reject('Test error');
                throw new Error('Should not reach here');
            } catch (e) {
                expect(e).toBe('Test error');
            }
        });
        expect(asyncFunction()).resolves.toBeUndefined();
    });
});