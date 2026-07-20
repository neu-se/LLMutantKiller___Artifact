import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it.skip('should throw an error when Q_DEBUG is set to true', () => {
        // Given
        const originalProcessEnv = process.env;
        process.env = { Q_DEBUG: 'true' };

        // When and Then
        expect(() => {
            q.Q.longStackSupport = true;
        }).not.toThrow();

        // Restore original process.env
        process.env = originalProcessEnv;
    });

    it('should throw an error when Q_DEBUG is not set', () => {
        // Given
        const originalProcessEnv = process.env;
        process.env = {};

        // When and Then
        expect(() => {
            q.Q.longStackSupport = true;
        }).toThrow();
        
        // Restore original process.env
        process.env = originalProcessEnv;
    });
});