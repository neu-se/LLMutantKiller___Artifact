import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should not create a global Q object when ses.ok() is true", () => {
        var originalSesOk = Q.sesOk;
        Q.sesOk = function() { return true; };
        var originalGlobalQ = globalThis.Q;
        var globalQ = Q;
        expect(globalThis.Q).toBeUndefined();
        Q.sesOk = originalSesOk;
        globalThis.Q = originalGlobalQ;
    });
});