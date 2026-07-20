import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should run the next tick when using runAfter', () => {
        let flag = false;
        Q.nextTick.runAfter(() => {
            flag = true;
        });
        expect(flag).toBe(false);
        // Simulate the next tick
        Q.nextTick.flush();
        expect(flag).toBe(true);
    });
});