import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the function passed to nextTick', (done) => {
        let called = false;
        Q.nextTick(() => {
            called = true;
            expect(called).toBe(true);
            done();
        });
        expect(called).toBe(false);
    });
});