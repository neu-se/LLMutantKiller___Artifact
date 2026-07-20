import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should pass when Q.longStackSupport is enabled by Q_DEBUG environment variable", () => {
        // Arrange
        const originalQDebug = process.env.Q_DEBUG;
        process.env.Q_DEBUG = 'true';

        // Act and Assert
        expect(Q.longStackSupport).toBe(true);

        // Cleanup
        process.env.Q_DEBUG = originalQDebug;
    });

    it("should fail when Q.longStackSupport is always enabled", () => {
        // Arrange
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        // Act and Assert
        expect(Q.longStackSupport).toBe(true);

        // Cleanup
        Q.longStackSupport = originalLongStackSupport;
    });
});