import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not set ses.makeQ when ses is not ok", () => {
        // We need to mock the ses object to test the behavior
        const originalSes = global.ses;
        global.ses = { ok: () => false };

        Q();

        expect(global.ses.makeQ).toBeUndefined();

        // Restore the original ses object
        global.ses = originalSes;
    });
});