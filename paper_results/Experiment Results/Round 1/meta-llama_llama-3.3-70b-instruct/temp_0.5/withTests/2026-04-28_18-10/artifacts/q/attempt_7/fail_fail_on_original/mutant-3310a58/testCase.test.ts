import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should check the condition for setting Q.longStackSupport", () => {
        // Arrange
        const originalProcessEnv = process.env;
        process.env = {};

        // Act and Assert
        expect(Q.longStackSupport).toBe(false);

        Q.longStackSupport = true;
        expect(Q.longStackSupport).toBe(true);

        process.env.Q_DEBUG = undefined;
        expect(Q.longStackSupport).toBe(true); // This should be true in both original and mutated code

        process.env.Q_DEBUG = 'true';
        expect(Q.longStackSupport).toBe(true); // This should be true in both original and mutated code

        process.env.Q_DEBUG = undefined;
        Q.longStackSupport = false;
        expect(Q.longStackSupport).toBe(false); // This should be false in the original code

        process.env.Q_DEBUG = 'true';
        expect(Q.longStackSupport).toBe(true); // This should be true in the original code but false in the mutated code if Q.longStackSupport is not set to true

        process.env = originalProcessEnv;
    });
});