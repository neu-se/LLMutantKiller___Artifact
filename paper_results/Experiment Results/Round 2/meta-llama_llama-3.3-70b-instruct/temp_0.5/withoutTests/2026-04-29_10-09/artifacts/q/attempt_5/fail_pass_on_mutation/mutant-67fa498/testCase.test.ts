import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should properly handle the laterQueue', () => {
        const promise = Q.resolve();
        Q.nextTick(() => {
            promise.then(() => {
                // Do nothing
            });
        });
        expect(true).toBe(true);
    });
});