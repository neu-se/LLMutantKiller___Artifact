import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function with longStackSupport", () => {
    it("should throw an error when Q.longStackSupport is accessed before setting Q_DEBUG", () => {
        // Check if longStackSupport is false by default
        expect(Q.longStackSupport).toBe(false);

        // Set Q_DEBUG environment variable
        process.env.Q_DEBUG = "true";

        // Check if longStackSupport is enabled
        expect(Q.longStackSupport).toBe(true);
    });
});