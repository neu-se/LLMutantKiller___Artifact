import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when ses is ok in the mutated code", () => {
        // We need to mock the ses object to test the behavior
        const originalSes = global.ses;
        global.ses = { ok: () => true };

        // Since we can't directly test the behavior of the IIFE, we need to
        // test the behavior of the Q object that is returned by the IIFE.
        // We can test the behavior of the Q object by checking if it throws
        // an error when ses is ok in the mutated code.
        expect(() => {
            // If ses is ok in the mutated code, the Q object should throw an error.
            Q();
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original ses object
        global.ses = originalSes;
    });
});