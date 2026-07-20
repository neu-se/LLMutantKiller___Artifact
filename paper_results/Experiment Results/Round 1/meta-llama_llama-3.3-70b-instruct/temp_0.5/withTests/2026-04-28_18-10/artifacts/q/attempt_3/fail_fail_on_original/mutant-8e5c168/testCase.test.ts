import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('promise function', () => {
    it('should call the resolver function', () => {
        var called = false;
        var resolver = function(resolve, reject) {
            called = true;
            resolve('resolved');
        };
        Q.promise(resolver);
        expect(called).toBe(true);
    });
});