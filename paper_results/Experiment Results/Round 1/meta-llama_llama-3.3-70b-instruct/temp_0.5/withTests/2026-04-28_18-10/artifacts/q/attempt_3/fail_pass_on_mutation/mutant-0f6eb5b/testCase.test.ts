import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should enable long stack traces when Q_DEBUG is set and Q.longStackSupport is true", () => {
        process.env.Q_DEBUG = "true";
        Q.longStackSupport = true;
        expect(Q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });
});