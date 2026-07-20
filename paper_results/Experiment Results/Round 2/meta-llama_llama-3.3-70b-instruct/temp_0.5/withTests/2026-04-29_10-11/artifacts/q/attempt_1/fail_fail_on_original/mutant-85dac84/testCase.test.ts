import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of thenReject", () => {
        var promise = Q.delay(20);
        var error = new Error("Test error");
        return promise.thenReject(error)
            .then(function () {
                expect(true).toBe(false);
            }, function (reason) {
                expect(reason).toBe(error);
            });
    });
});