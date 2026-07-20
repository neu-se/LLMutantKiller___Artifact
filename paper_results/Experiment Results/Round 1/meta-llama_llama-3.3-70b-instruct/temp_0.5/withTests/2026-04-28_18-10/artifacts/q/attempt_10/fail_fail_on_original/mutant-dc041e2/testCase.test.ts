import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should create a global Q object when ses is not ok", () => {
        var originalSes = globalThis.ses;
        globalThis.ses = { ok: function() { return false; } };

        var q = Q;

        expect(globalThis.Q).toBeDefined();

        globalThis.ses = originalSes;
    });
});