import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function with longStackSupport", () => {
    it("should throw an error when Q_DEBUG is set but Q.longStackSupport is not enabled", () => {
        // Set Q_DEBUG environment variable
        process.env.Q_DEBUG = "true";

        // Call the Q function
        expect(() => {
            Q.longStackSupport = false;
            const q = new Q(10);
        }).toThrowError();
    });
});