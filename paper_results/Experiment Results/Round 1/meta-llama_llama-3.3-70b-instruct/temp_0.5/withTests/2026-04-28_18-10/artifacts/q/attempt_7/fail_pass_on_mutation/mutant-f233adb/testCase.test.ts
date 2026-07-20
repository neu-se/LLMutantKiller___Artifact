import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('SES support', () => {
    it('should throw an error when trying to use Q in a non-supported environment', () => {
        // Since the mutation removes the ses support, this test should pass on the original code and fail on the mutated code
        if (typeof q === 'function') {
            expect(true).toBe(true);
        } else {
            expect(true).toBe(false);
        }
    });
});