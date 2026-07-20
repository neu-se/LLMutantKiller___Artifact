import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('SES support', () => {
    it('should define Q when ses is supported', () => {
        // Since the mutation removes the ses support, this test should pass on the original code and fail on the mutated code
        expect(typeof q).toEqual('object');
        expect(typeof q.Q).toEqual('function');
    });
});