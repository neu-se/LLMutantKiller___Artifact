import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", (done) => {
        var laterQueue = Q.nextTick.laterQueue;
        var originalLength = laterQueue.length;

        Q.nextTick.runAfter(function () {
            // do nothing
        });

        setTimeout(function () {
            if (laterQueue.length === originalLength) {
                done.fail("Task was not executed");
            } else {
                done();
            }
        }, 10);
    });
});