import { Q } from "./q.js";

describe("Q.any", () => {
    it("should call the onProgress callback when a promise is resolved", (done) => {
        var promise1 = Q.delay(100).then(function () { return "first"; });
        var promise2 = Q.delay(50).then(function () { return "second"; });
        var promises = [promise1, promise2];

        var progressCalled = false;
        Q.any(promises).progress(function (progress) {
            progressCalled = true;
            expect(progress).not.toBeNull();
        }).then(function () {
            expect(progressCalled).toBe(true);
            done();
        });
    });
});