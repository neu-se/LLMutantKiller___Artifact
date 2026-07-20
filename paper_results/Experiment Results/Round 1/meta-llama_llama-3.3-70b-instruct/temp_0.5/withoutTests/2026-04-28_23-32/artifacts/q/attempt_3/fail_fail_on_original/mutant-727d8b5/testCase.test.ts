import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject with the correct error message when all promises are rejected and onRejected callback is called", (done) => {
        var promises = [
            Q.reject("first"),
            Q.reject("second"),
            Q.reject("third")
        ];

        Q.any(promises).then(function () {
            done(new Error("Expected Q.any to reject"));
        }, function (error) {
            expect(typeof error).toBe("object");
            expect(error.message).toContain("Q can't get fulfillment value from any promise, all promises were rejected");
            done();
        });
    });
});