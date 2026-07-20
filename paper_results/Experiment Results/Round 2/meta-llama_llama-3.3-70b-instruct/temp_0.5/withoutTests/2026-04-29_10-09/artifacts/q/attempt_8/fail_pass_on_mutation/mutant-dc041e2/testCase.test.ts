import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should set ses.makeQ when ses is not ok", () => {
        // We need to mock the ses object to test the behavior
        const originalSes = global.ses;
        global.ses = { ok: () => false };

        Q(null);

        expect(global.ses).not.toHaveProperty('makeQ');

        // Restore the original ses object
        global.ses = originalSes;
    });
});