import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should create a global Q object when not in a secure EcmaScript environment", () => {
        var originalGlobal = globalThis;
        globalThis.ses = { ok: function() { return false; } };
        var QCopy = Q;
        expect(globalThis.Q).toBeDefined();
        globalThis.Q = undefined;
        globalThis.ses = undefined;
        globalThis = originalGlobal;
    });
});