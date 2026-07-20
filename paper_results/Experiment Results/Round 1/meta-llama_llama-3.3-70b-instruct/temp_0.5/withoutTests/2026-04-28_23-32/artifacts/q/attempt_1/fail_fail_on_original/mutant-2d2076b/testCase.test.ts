import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.delay', () => {
    it('should delay the resolution of a promise by the specified timeout', (done) => {
        const timeout = 100;
        const startTime = new Date().getTime();
        Q.delay(Promise.resolve(), timeout).then(() => {
            const endTime = new Date().getTime();
            expect(endTime - startTime).toBeGreaterThanOrEqual(timeout);
            done();
        });
    });
});