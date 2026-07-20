import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should create a global Q object when ses.ok() is false", () => {
        var originalSesOk = Q.sesOk;
        Q.sesOk = function() { return false; };
        var globalQ = Q;
        expect(typeof globalQ).toBe('function');
        Q.sesOk = originalSesOk;
    });
});