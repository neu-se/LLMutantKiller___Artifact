import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", (done) => {
        var executed = false;
        var count = 0;

        function task() {
            executed = true;
            count++;
        }

        Q.nextTick(task);
        Q.nextTick(task);

        setTimeout(function () {
            if (count !== 2) {
                done.fail("Tasks were not executed correctly");
            } else {
                done();
            }
        }, 10);
    });
});