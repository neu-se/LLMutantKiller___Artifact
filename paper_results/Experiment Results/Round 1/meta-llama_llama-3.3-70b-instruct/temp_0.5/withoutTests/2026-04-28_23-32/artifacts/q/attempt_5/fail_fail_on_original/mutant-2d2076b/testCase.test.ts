import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', () => {
    it('should delay the resolution of a promise by the specified timeout when timeout is provided and object is undefined', () => {
        const timeout = 100;
        const startTime = new Date().getTime();
        return Q.delay(undefined, timeout).then(() => {
            const endTime = new Date().getTime();
            expect(endTime - startTime).toBeGreaterThanOrEqual(timeout);
        });
    });

    it('should not delay the resolution of a promise when timeout is provided and object is undefined in the mutated code', () => {
        const timeout = 100;
        const startTime = new Date().getTime();
        return Q.delay(undefined, timeout).then(() => {
            const endTime = new Date().getTime();
            expect(endTime - startTime).toBeLessThan(timeout);
        });
    });
});