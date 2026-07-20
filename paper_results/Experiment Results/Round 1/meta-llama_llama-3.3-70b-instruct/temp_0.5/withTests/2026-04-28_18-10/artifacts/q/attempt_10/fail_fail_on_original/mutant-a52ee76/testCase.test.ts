import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function with longStackSupport", () => {
    it("should set longStackSupport to true when Q_DEBUG is set and then reset it", () => {
        // Set Q_DEBUG environment variable
        process.env.Q_DEBUG = "true";

        // Check if longStackSupport is enabled
        Q.longStackSupport = false;
        Q(10);
        expect(Q.longStackSupport).toBe(true);

        // Reset Q_DEBUG environment variable
        delete process.env.Q_DEBUG;
        Q.longStackSupport = false;
        Q(10);
        expect(Q.longStackSupport).toBe(false);
    });
});