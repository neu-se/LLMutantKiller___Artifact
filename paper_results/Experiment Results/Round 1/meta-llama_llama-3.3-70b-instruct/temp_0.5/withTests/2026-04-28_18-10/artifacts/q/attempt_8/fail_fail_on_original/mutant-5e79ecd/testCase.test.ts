import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q done function', () => {
    it('should call the onRejected callback when the promise is rejected and throw an error', () => {
        var error = new Error("Test Error");
        var promise = Q.reject(error).done(null, function (err) {
            if (err !== error) {
                throw new Error("Wrong error");
            }
        });

        return promise.catch(function (err) {
            expect(err.message).toBe("Wrong error");
        });
    });
});