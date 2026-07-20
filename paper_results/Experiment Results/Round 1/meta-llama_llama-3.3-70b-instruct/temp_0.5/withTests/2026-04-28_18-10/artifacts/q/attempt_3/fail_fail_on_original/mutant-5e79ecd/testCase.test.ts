import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q done function', () => {
    it('should call the callback when the promise is fulfilled', () => {
        var called = false;

        var promise = Q("foo").done(function () {
            called = true;
        });

        return promise.then(function () {
            expect(called).toBe(true);
        });
    });
});