import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should set ses.makeQ when ses is ok", () => {
        // We need to mock the ses object to test the behavior
        const originalSes = global.ses;
        global.ses = { ok: () => true };

        Q();

        expect(global.ses.makeQ).toBeDefined();

        // Restore the original ses object
        global.ses = originalSes;
    });
});