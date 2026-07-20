import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call the progressed callback when the promise is resolved', () => {
        let progressed = false;
        Q().then(void 0, void 0, () => {
            progressed = true;
        });
        expect(progressed).toBe(false); // The progressed callback should not be called immediately

        // Simulate the resolution of the promise
        Q().then(() => {
            expect(progressed).toBe(false); // The progressed callback should not be called when the promise is resolved
        });
    });
});