import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have Q.longStackSupport as false by default and change it to true when Q_DEBUG is set", () => {
        // Arrange
        const originalQDebug = process.env.Q_DEBUG;

        // Act and Assert
        expect(Q.longStackSupport).toBe(false);
        process.env.Q_DEBUG = 'true';
        expect(Q.longStackSupport).toBe(true);

        // Cleanup
        process.env.Q_DEBUG = originalQDebug;
    });
});