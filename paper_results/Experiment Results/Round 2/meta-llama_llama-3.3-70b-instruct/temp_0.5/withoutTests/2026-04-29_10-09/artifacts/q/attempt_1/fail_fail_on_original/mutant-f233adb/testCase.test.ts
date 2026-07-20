import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when ses is not ok', () => {
        // We need to mock the ses object and make it return false for the ok method
        const originalSesOk = global.ses && global.ses.ok;
        global.ses = { ok: () => false };

        expect(() => {
            // We need to require the q module again to make sure the new ses object is used
            const Q = require('../../../../../../../../subject_repositories/q/q').Q;
        }).toThrowError('This environment was not anticipated by Q. Please file a bug.');

        // Restore the original ses object
        if (originalSesOk) {
            global.ses.ok = originalSesOk;
        } else {
            delete global.ses;
        }
    });
});