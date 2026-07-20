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

        delete process.env.Q_DEBUG;
        expect(Q.longStackSupport).toBe(true);

        process.env.Q_DEBUG = 'true';
        expect(Q.longStackSupport).toBe(true);

        delete process.env.Q_DEBUG;
        Q.longStackSupport = false;
        expect(Q.longStackSupport).toBe(false);

        // This line should fail in the mutated code because Q.longStackSupport is always true
        expect(() => {
            Q.longStackSupport = false;
            delete process.env.Q_DEBUG;
            expect(Q.longStackSupport).toBe(false);
        }).not.toThrowError();

        process.env = originalProcessEnv;
    });
});