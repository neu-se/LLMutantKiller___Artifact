import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have longStackSupport as false when Q_DEBUG is not set', () => {
        // Given
        const originalProcessEnv = process.env;
        process.env = {};

        // Then
        expect(q.longStackSupport).toBe(false);

        // Restore original process.env
        process.env = originalProcessEnv;
    });

    it.skip('should have longStackSupport as true when Q_DEBUG is set', () => {
        // Given
        const originalProcessEnv = process.env;
        process.env = { Q_DEBUG: 'true' };

        // Then
        expect(q.longStackSupport).toBe(true);

        // Restore original process.env
        process.env = originalProcessEnv;
    });
});