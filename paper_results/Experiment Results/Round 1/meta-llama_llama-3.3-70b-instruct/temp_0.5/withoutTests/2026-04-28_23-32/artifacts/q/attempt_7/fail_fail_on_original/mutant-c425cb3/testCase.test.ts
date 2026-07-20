import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should not call the progressed callback when the promise is resolved in the original code', (done) => {
        let progressed = false;
        Q().then(
            () => {
                expect(progressed).toBe(false);
                done();
            },
            () => {
                expect(true).toBe(false);
                done();
            },
            () => {
                progressed = true;
            }
        );
        Q.resolve();
    });
});