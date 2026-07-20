import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle ses properly when it is not ok', () => {
        // Mock the ses object
        const ses = {
            ok: () => false,
            makeQ: () => {}
        };

        // Use the global object to set the ses property
        globalThis.ses = ses;

        // Call the Q function
        const result = Q(function () {
            return {};
        });

        // Expect no error to be thrown
        expect(typeof result).toBe('object');
    });
});