import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function with longStackSupport", () => {
    it("should enable long stack support when Q_DEBUG is set", () => {
        // Set Q_DEBUG environment variable
        process.env.Q_DEBUG = "true";

        // Call the Q function
        Q();

        // Check if longStackSupport is enabled
        expect(Q.longStackSupport).toBe(true);
    });
});