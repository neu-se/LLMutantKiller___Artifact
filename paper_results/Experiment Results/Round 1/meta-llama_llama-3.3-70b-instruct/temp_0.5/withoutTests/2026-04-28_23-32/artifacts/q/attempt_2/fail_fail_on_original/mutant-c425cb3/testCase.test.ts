import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should not call the progressed callback when an exception is thrown', () => {
        let progressed = false;
        let rejected = false;
        Q().then(void 0, () => {
            rejected = true;
        }, () => {
            progressed = true;
        });
        Q.reject('test').then(void 0, () => {
            expect(progressed).toBe(false); // The progressed callback should not be called when an exception is thrown
            expect(rejected).toBe(true); // The rejected callback should be called
        });
    });
});