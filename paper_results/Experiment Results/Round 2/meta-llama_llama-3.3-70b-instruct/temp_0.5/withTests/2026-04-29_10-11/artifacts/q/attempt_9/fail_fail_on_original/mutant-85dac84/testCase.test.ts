import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of thenReject", () => {
        var promise = Q.delay(20);
        var error = new Error("Test error");
        var result = promise.thenReject(error);
        expect(result instanceof Q.Promise).toBe(true);
        return result.then(function () {
            throw new Error("thenReject should reject the promise");
        }, function (reason) {
            expect(reason).toBe(error);
        });
    });
});