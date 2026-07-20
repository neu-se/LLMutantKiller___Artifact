import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function with longStackSupport", () => {
    it("should enable long stack support when Q_DEBUG is set", () => {
        // Set Q_DEBUG environment variable
        process.env.Q_DEBUG = "true";

        // Call the Q function
        const q = Q();

        // Check if longStackSupport is enabled
        expect(Q.longStackSupport).toBe(true);
    });

    it("should not enable long stack support when Q_DEBUG is not set", () => {
        // Unset Q_DEBUG environment variable
        delete process.env.Q_DEBUG;

        // Call the Q function
        const q = Q();

        // Check if longStackSupport is not enabled
        expect(Q.longStackSupport).toBe(false);
    });
});