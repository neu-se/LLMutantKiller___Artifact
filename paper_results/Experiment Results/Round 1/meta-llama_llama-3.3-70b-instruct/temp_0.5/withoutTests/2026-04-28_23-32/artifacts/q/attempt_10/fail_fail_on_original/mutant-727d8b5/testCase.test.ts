import { Q } from "./q.js";

describe("Q.any", () => {
    it("should throw an error when onProgress callback is not called", (done) => {
        var promise1 = Q.delay(100).then(function () { return "first"; });
        var promise2 = Q.delay(50).then(function () { return "second"; });
        var promises = [promise1, promise2];

        var progressCalled = false;
        Q.any(promises).progress(function (progress) {
            progressCalled = true;
        }).then(function () {
            if (!progressCalled) {
                throw new Error("onProgress callback was not called");
            }
            done();
        }).catch(function (error) {
            expect(error.message).toBe("onProgress callback was not called");
            done();
        });
    });
});