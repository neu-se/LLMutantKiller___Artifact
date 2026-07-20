import { nextTick } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('nextTick', () => {
    it('should run the next tick when using runAfter', (done) => {
        let flag = false;
        nextTick.runAfter(() => {
            flag = true;
            expect(flag).toBe(true);
            done();
        });
        expect(flag).toBe(false);
    });
});