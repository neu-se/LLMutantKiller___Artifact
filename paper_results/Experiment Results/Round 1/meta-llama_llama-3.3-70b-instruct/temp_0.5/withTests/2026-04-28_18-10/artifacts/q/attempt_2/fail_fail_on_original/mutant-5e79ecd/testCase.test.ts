import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q done function', () => {
    it('should not call the callback if the promise is rejected', () => {
        var called = false;

        var promise = Q.reject("bar").done(
            function () {
                called = true;
            }
        );

        return promise.then(function () {
            expect(called).toBe(false);
        }, function () {
            expect(called).toBe(false);
        });
    });
});