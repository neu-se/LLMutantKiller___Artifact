import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function with longStackSupport", () => {
    it("should not set longStackSupport to true when Q_DEBUG is not set", () => {
        // Unset Q_DEBUG environment variable
        delete process.env.Q_DEBUG;

        // Check if longStackSupport is not enabled
        Q(10);
        expect(Q.longStackSupport).toBe(false);
    });
});