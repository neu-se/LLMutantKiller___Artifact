import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject with an error when all promises are rejected", (done) => {
        var promises = [
            Q.reject("first"),
            Q.reject("second"),
            Q.reject("third")
        ];

        var errorCaught = false;
        Q.any(promises).then(function () {
            done(new Error("Expected Q.any to reject"));
        }, function (error) {
            errorCaught = true;
            expect(error).not.toBeNull();
            done();
        });
    });
});