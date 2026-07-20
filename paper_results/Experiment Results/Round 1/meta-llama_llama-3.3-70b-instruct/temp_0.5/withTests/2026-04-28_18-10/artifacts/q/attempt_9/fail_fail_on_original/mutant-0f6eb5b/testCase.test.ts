import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should set Q.longStackSupport to true when Q_DEBUG is set", (done) => {
        process.env.Q_DEBUG = "true";
        const originalValue = Q.longStackSupport;
        Q.longStackSupport = false;
        expect(Q.longStackSupport).toBe(true);
        Q.longStackSupport = originalValue;
        delete process.env.Q_DEBUG;
        done();
    });
});