import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when ses is ok in the mutated code, but not in the original code", () => {
        // We need to mock the ses object to test the behavior
        const originalSes = global.ses;
        global.ses = { ok: () => true };

        // In the mutated code, if ses is ok, it should not throw an error
        // But in the original code, it should throw an error
        expect(() => {
            // If ses is ok in the original code, the Q object should throw an error.
            Q();
        }).toThrowError();

        // Restore the original ses object
        global.ses = originalSes;
    });
});