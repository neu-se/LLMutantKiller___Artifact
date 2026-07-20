import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", (done) => {
        var executed = false;

        Q.nextTick(function () {
            executed = true;
        });

        Q.nextTick(function () {
            if (!executed) {
                done.fail("Task was not executed");
            } else {
                done();
            }
        });
    });
});