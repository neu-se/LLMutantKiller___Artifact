import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('SES support', () => {
    it('should define Q as a function in a browser environment', () => {
        // Since the mutation removes the ses support, this test should pass on the original code and fail on the mutated code
        if (typeof window !== 'undefined') {
            expect(typeof q).toEqual('object');
            expect(typeof q.Q).toEqual('function');
        } else {
            expect(true).toBe(false);
        }
    });
});