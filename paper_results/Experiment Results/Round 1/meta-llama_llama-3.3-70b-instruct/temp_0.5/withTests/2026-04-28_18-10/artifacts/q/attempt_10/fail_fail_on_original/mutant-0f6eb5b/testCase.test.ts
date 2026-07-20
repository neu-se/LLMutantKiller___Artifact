import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should set Q.longStackSupport to true when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = "true";
        expect(Q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });
});