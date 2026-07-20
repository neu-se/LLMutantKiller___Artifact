import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function with longStackSupport", () => {
    it("should set longStackSupport to true when Q_DEBUG is set", () => {
        // Set Q_DEBUG environment variable
        process.env.Q_DEBUG = "true";

        // Check if longStackSupport is enabled
        const originalLongStackSupport = Q.longStackSupport;
        Q(10);
        expect(Q.longStackSupport).not.toBe(originalLongStackSupport);
    });
});