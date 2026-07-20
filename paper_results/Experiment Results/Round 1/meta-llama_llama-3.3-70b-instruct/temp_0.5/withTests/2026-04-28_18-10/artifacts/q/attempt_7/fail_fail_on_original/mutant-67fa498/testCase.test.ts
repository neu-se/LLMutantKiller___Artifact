import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", (done) => {
        var task = function () {
            done();
        };

        Q.nextTick(task);

        // Add a timeout to fail the test if the task is not executed
        setTimeout(function () {
            done.fail("Task was not executed");
        }, 10);
    });
});