import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when ses is not ok in the original code, but throw an error when ses is ok in the mutated code", () => {
        // We need to mock the ses object to test the behavior
        const originalSes = global.ses;
        global.ses = { ok: () => false };

        // Since we can't directly test the behavior of the IIFE, we need to
        // test the behavior of the Q object that is returned by the IIFE.
        // We can test the behavior of the Q object by checking if it does not
        // throw an error when ses is not ok in the original code.
        expect(() => {
            // If ses is not ok in the original code, the Q object should not throw an error.
            Q(1);
        }).not.toThrowError();

        // Now, we set ses to be ok
        global.ses = { ok: () => true };

        // In the mutated code, if ses is ok, it should not throw an error
        // But in the original code, it should throw an error
        expect(() => {
            Q(1);
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original ses object
        global.ses = originalSes;
    });
});