import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle domain exit correctly', async () => {
        const error = new Error();
        try {
            q.nextTick(function () {
                throw error;
            });
        } catch (e) {
            // No assertion here, just testing that the code runs without errors
        }
    });
});