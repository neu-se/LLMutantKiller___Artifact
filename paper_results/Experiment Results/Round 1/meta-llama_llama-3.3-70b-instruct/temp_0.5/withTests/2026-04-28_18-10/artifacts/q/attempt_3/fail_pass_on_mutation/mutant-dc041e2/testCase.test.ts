import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should create a promise that resolves to ses when ses.ok() is false", () => {
        var originalSesOk = Q.sesOk;
        Q.sesOk = function() { return false; };
        var ses = Q();
        expect(ses.isFulfilled()).toBe(true);
        Q.sesOk = originalSesOk;
    });
});