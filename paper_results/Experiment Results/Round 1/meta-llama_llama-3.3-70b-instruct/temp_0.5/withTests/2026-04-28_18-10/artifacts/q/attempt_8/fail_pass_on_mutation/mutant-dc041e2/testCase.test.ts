import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should not create a global Q object when in a secure EcmaScript environment", () => {
        var originalSes = globalThis.ses;
        globalThis.ses = { ok: function() { return true; } };

        try {
            var q = Q;
        } catch (e) {
            expect(e.message).toBe("This environment was not anticipated by Q. Please file a bug.");
        }

        globalThis.ses = originalSes;
    });
});