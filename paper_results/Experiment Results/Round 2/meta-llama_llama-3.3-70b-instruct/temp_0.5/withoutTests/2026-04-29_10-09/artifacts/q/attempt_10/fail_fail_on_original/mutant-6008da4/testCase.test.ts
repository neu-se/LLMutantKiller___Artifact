import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should use process.nextTick when isNodeJS is true', () => {
        // Act
        const originalIsNodeJS = Q.isNodeJS;
        Q.isNodeJS = true;

        // Assert
        expect(Q.nextTick.toString()).toContain('process.nextTick');

        // Clean up
        Q.isNodeJS = originalIsNodeJS;
    });
});