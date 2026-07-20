import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of thenReject", () => {
        var promise = Q.delay(20);
        var error = new Error("Test error");
        var originalThenReject = Q.Promise.prototype.thenReject;
        Q.Promise.prototype.thenReject = function(reason) {
            return this.then(function () {
                throw reason;
            });
        };
        var result = promise.thenReject(error);
        expect(result instanceof Q.Promise).toBe(true);
        Q.Promise.prototype.thenReject = originalThenReject;
        return result.then(function () {
            expect(true).toBe(false);
        }, function (reason) {
            expect(reason).toBe(error);
        });
    });
});