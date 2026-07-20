import { Q } from "../../../q.js";

describe("Q.any", () => {
    it("should call the onProgress callback with the correct progress information", (done) => {
        var promises = [
            Q.delay(100).then(function () { return "first"; }),
            Q.delay(50).then(function () { return "second"; }),
            Q.delay(200).then(function () { return "third"; })
        ];

        var progressCalled = false;
        Q.any(promises).progress(function (progress) {
            progressCalled = true;
            expect(progress).not.toBeNull();
        }).then(function () {
            if (!progressCalled) {
                done(new Error("onProgress callback was not called"));
            } else {
                done();
            }
        });
    });
});