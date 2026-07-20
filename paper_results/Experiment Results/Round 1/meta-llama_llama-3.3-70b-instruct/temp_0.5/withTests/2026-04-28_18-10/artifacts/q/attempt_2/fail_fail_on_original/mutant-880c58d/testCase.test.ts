import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have Q.longStackSupport as false by default and change it to true when Q_DEBUG is set", () => {
        // Arrange
        const originalQDebug = process.env.Q_DEBUG;
        process.env.Q_DEBUG = 'true';
        const q = Q();

        // Act and Assert
        expect(q.longStackSupport).toBe(false);
        delete process.env.Q_DEBUG;
        process.env.Q_DEBUG = 'true';
        const q2 = Q();
        expect(q2.longStackSupport).toBe(true);

        // Cleanup
        process.env.Q_DEBUG = originalQDebug;
    });
});