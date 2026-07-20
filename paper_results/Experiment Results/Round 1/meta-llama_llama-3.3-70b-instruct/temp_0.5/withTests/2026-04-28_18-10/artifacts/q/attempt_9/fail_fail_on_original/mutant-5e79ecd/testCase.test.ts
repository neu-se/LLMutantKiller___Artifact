import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q done function', () => {
    it('should throw an error when the onFulfilled callback throws an error', () => {
        var error = new Error("Test Error");
        var promise = Q("test").done(function () {
            throw error;
        });

        return promise.catch(function (err) {
            expect(err).toBe(error);
        });
    });
});