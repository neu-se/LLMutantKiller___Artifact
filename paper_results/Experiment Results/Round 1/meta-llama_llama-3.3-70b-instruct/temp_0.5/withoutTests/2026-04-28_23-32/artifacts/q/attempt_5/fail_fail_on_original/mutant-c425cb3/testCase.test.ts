import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call the progressed callback when the promise is resolved and a progress callback is provided in the mutated code', () => {
        let progressed = false;
        Q().then(void 0, void 0, () => {
            progressed = true;
        });
        Q.resolve().then(void 0, void 0, () => {
            // do nothing
        });
        expect(progressed).toBe(true); 
    });
});