import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should not call the progressed callback when the promise is resolved', () => {
        let progressed = false;
        Q().then(void 0, void 0, () => {
            progressed = true;
        });
        Q.resolve();
        expect(progressed).toBe(false); 
    });
});