import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have long stack support disabled by default if Q_DEBUG is not set', () => {
        // Given
        const originalProcessEnv = process.env;
        process.env = {};

        // When
        const longStackSupport = q.Q.longStackSupport;

        // Then
        expect(longStackSupport).toBe(false);

        // Restore original process.env
        process.env = originalProcessEnv;
    });

    it('should have long stack support enabled when Q_DEBUG is set to true', () => {
        // Given
        const originalProcessEnv = process.env;
        process.env = { Q_DEBUG: 'true' };

        // When
        const longStackSupport = q.Q.longStackSupport;

        // Then
        expect(longStackSupport).toBe(true);

        // Restore original process.env
        process.env = originalProcessEnv;
    });
});