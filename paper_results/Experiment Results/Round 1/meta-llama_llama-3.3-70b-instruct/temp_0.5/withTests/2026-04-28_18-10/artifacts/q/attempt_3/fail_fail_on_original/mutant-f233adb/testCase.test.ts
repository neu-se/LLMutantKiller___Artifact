import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('SES support', () => {
    it('should throw an error when ses is not supported', () => {
        // Since the mutation removes the ses support, this test should pass on the original code and fail on the mutated code
        expect(() => {
            q.ses;
        }).toThrowError();
    });
});