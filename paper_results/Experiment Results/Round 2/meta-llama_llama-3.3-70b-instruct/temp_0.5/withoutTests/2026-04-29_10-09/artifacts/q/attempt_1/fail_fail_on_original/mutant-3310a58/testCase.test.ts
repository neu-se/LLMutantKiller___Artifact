import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not enable long stack support by default', () => {
        // If Q.longStackSupport is true, the test will fail because it's not the expected behavior
        expect(Q.longStackSupport).toBe(false);
    });
});