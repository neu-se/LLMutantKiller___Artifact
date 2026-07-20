import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should call resolver function when promise is created', () => {
        let called = false;
        Q.promise(function(resolve, reject) {
            called = true;
        });
        expect(called).toBe(true);
    });
});