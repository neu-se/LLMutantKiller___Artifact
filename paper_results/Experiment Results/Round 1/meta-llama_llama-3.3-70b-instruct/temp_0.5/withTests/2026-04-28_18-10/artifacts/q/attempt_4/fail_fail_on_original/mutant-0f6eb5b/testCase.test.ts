import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should set Q.longStackSupport to true when Q_DEBUG is set", () => {
        delete process.env.Q_DEBUG;
        process.env.Q_DEBUG = "true";
        const q = Q;
        expect(q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });
});