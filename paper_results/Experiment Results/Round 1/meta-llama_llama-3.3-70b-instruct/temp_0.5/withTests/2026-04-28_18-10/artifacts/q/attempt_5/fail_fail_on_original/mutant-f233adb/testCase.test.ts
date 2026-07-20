import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('SES support', () => {
    it('should define Q as a function', () => {
        // Since the mutation removes the ses support, this test should pass on the original code and fail on the mutated code
        expect(typeof q).toEqual('function');
    });
});