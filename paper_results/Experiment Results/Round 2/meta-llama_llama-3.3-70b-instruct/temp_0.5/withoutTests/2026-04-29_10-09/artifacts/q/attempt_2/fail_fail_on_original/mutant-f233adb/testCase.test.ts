import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should not throw an error when ses is ok', () => {
        // We need to mock the ses object and make it return true for the ok method
        global.ses = { ok: () => true };

        // We need to require the q module again to make sure the new ses object is used
        const Q = require('../../../../../../../../subject_repositories/q/q').Q;

        expect(() => {
            // This should not throw an error
            Q(1);
        }).not.toThrow();

        // Restore the original ses object
        delete global.ses;
    });
});