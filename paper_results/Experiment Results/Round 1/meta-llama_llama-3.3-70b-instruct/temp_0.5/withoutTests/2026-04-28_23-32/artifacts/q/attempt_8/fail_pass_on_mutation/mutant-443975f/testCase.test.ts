import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the function passed to nextTick with the correct arguments', (done) => {
        let called = false;
        Q.nextTick((arg1, arg2) => {
            expect(arg1).toBeUndefined();
            expect(arg2).toBeUndefined();
            called = true;
            done();
        });
        expect(called).toBe(false);
    });
});