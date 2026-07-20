import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should properly handle the laterQueue', (done) => {
        let count = 0;
        Q.nextTick(() => {
            count++;
        });
        Q.nextTick.runAfter(() => {
            count++;
            expect(count).toBe(2);
            done();
        });
    });
});