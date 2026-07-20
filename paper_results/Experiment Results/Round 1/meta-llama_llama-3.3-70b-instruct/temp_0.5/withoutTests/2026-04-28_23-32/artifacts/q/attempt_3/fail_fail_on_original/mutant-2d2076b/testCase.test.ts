import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', () => {
    it('should delay the resolution of a promise by the specified timeout when timeout is provided', () => {
        const timeout = 100;
        const startTime = new Date().getTime();
        return Q.delay(Promise.resolve(), timeout).then(() => {
            const endTime = new Date().getTime();
            expect(endTime - startTime).toBeGreaterThanOrEqual(timeout);
        });
    });

    it('should not delay the resolution of a promise when timeout is not provided in the mutated code', () => {
        const startTime = new Date().getTime();
        return Q.delay(Promise.resolve(), 100).then(() => {
            const endTime = new Date().getTime();
            expect(endTime - startTime).toBeLessThan(100);
        });
    });
});