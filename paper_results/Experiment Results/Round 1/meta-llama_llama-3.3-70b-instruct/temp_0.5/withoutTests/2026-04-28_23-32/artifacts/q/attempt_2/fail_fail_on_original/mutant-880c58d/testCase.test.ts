import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have long stack support disabled by default if Q_DEBUG is not set', () => {
        // Given
        const originalQ = Q;
        const originalProcessEnv = process.env;
        process.env = {};

        // When
        const longStackSupport = originalQ.longStackSupport;

        // Then
        expect(longStackSupport).toBe(false);

        // Restore original process.env
        process.env = originalProcessEnv;
    });
});