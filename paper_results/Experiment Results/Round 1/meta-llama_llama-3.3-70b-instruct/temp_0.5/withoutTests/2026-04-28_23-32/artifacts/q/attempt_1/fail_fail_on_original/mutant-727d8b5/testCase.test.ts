import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should call the onProgress callback with the correct progress information", (done) => {
        var promises = [
            Q.delay(100).then(function () { return "first"; }),
            Q.delay(50).then(function () { return "second"; }),
            Q.delay(200).then(function () { return "third"; })
        ];

        Q.any(promises).progress(function (progress) {
            expect(progress.index).toBe(1);
            expect(progress.value).toBe("second");
            done();
        });
    });
});