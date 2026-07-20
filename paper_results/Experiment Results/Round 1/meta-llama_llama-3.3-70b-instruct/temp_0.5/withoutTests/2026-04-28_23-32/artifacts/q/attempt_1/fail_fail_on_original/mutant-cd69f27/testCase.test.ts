import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when ses is not ok', () => {
        // Mock the ses object
        const ses = {
            ok: () => false,
        };

        // Use the global object to set the ses property
        globalThis.ses = ses;

        // Expect an error to be thrown
        expect(() => {
            // Call the Q function
            Q();
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });
});