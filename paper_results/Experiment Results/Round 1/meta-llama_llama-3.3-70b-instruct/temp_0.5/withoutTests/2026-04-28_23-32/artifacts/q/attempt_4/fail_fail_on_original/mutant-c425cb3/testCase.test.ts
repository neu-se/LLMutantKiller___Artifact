import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should not call the progressed callback when the promise is resolved and no progress callback is provided', () => {
        let progressed = false;
        Q().then(() => {
            expect(progressed).toBe(false); 
        }, void 0, () => {
            progressed = true;
        });
        Q.resolve();
    });
});