import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', () => {
    it('should throw an error when timeout is not a number', () => {
        expect(() => Q.delay(Promise.resolve(), 'a')).toThrowError();
    });

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