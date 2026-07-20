import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('SES support', () => {
    it('should define Q as a function and behave correctly', () => {
        // Since the mutation removes the ses support, this test should pass on the original code and fail on the mutated code
        if (typeof window !== 'undefined' || typeof self !== 'undefined') {
            expect(typeof q).toBe('function');
            const promise = q(1);
            expect(typeof promise.then).toBe('function');
        } else {
            expect(() => q(1)).toThrowError();
        }
    });
});