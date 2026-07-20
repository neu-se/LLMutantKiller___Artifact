import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('SES support', () => {
    it('should define Q as a function and have ses support', () => {
        // Since the mutation removes the ses support, this test should pass on the original code and fail on the mutated code
        if (typeof q === 'function' && typeof q.ses!== 'undefined') {
            expect(true).toBe(true);
        } else {
            expect(true).toBe(false);
        }
    });
});