import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q done function', () => {
    it('should call the onRejected callback when the promise is rejected', () => {
        var called = false;

        var promise = Q.reject("error").done(null, function () {
            called = true;
        });

        return promise.catch(function () {
            expect(called).toBe(true);
        });
    });
});