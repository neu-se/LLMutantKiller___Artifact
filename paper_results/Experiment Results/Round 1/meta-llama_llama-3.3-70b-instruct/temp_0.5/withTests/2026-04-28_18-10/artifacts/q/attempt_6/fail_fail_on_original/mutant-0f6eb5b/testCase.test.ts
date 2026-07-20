import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error with a long stack trace when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = "true";
        const error = new Error("Test error");
        try {
            throw error;
        } catch (e) {
            expect(e.stack).toContain("Q");
        } finally {
            delete process.env.Q_DEBUG;
        }
    });
});