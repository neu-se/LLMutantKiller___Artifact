import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when ses is ok", () => {
        // We need to mock the ses object to test the behavior
        const originalSes = global.ses;
        global.ses = { ok: () => true };

        expect(() => {
            // We need to call the Q function to test its behavior
            const q = Q();
            expect(q).toBeInstanceOf(Object);
        }).not.toThrowError();

        // Restore the original ses object
        global.ses = originalSes;
    });
});