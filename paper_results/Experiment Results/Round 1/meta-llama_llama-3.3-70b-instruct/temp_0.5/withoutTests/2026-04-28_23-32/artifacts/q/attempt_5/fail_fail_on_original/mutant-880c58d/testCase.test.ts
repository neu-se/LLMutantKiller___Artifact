import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set long stack support to true when Q_DEBUG is set', () => {
        // Given
        const originalProcessEnv = process.env;
        process.env = { Q_DEBUG: 'true' };

        // Then
        expect(q.Q.longStackSupport).toBe(true);

        // Restore original process.env
        process.env = originalProcessEnv;
    });

    it('should set long stack support to false when Q_DEBUG is not set', () => {
        // Given
        const originalProcessEnv = process.env;
        process.env = {};

        // Then
        expect(q.Q.longStackSupport).toBe(false);

        // Restore original process.env
        process.env = originalProcessEnv;
    });
});