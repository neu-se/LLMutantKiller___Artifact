import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should set Q.longStackSupport to true when Q_DEBUG is set and it's initially false", () => {
        Q.longStackSupport = false;
        process.env.Q_DEBUG = "true";
        const q = Q;
        expect(q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
        Q.longStackSupport = false;
    });
});