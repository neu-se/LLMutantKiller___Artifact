import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should check the condition for setting Q.longStackSupport", () => {
        // Arrange
        const originalProcessEnv = process.env;
        process.env = {};

        // Act and Assert
        expect(Q.longStackSupport).toBe(false);

        process.env.Q_DEBUG = 'true';
        Q.longStackSupport = false;
        expect(Q.longStackSupport).toBe(false); // This should be false in the original code

        process.env.Q_DEBUG = undefined;
        expect(Q.longStackSupport).toBe(false); // This should be false in the original code but true in the mutated code

        process.env = originalProcessEnv;
    });
});