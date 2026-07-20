import { Q } from "../../../q.js";

describe("Q.any", () => {
    it("should call the onRejected callback with the correct error when all promises are rejected", (done) => {
        var promises = [
            Q.reject("first"),
            Q.reject("second"),
            Q.reject("third")
        ];

        Q.any(promises).then(function () {
            done(new Error("Expected Q.any to reject"));
        }, function (error) {
            expect(error).toBeInstanceOf(Error);
            done();
        });
    });
});