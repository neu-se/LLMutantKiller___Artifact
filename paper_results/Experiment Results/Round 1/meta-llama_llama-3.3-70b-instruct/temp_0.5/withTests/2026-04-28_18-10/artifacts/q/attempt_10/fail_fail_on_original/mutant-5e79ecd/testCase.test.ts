import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q done function', () => {
    it('should not throw an error when the onFulfilled callback does not throw an error', () => {
        var promise = Q("test").done(function () {
            return "test";
        });

        return promise.then(function (value) {
            expect(value).toBe("test");
        });
    });
});