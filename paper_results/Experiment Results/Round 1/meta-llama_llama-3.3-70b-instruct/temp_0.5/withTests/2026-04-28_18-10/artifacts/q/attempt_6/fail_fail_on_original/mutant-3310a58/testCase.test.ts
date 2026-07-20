import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should check the condition for setting Q.longStackSupport", () => {
        // Arrange
        const originalProcessEnv = process.env;
        process.env = {};

        // Act and Assert
        expect(Q.longStackSupport).toBe(false);

        process.env.Q_DEBUG = 'true';
        expect(Q.longStackSupport).toBe(true);

        delete process.env.Q_DEBUG;
        expect(() => {
            Q.longStackSupport = true;
        }).not.toThrow();

        process.env = originalProcessEnv;
    });
});