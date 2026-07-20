import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should run the next tick when using runAfter', (done) => {
        let flag = false;
        Q.nextTick.runAfter(() => {
            flag = true;
            expect(flag).toBe(true);
            done();
        });
        expect(flag).toBe(false);
    });
});