import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not have long stack support enabled by default', () => {
        // Given
        const originalQ = Q;

        // When
        const longStackSupport = originalQ.longStackSupport;

        // Then
        expect(longStackSupport).toBe(false);
    });
});