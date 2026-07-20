import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.done", () => {
    it("should call the callback and return nothing when the promise is fulfilled", () => {
        var promise = Q(10);
        promise.done(function (value) {
            expect(value).toBe(10);
        });
    });
});