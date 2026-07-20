// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick runAfter functionality", () => {
    it("should execute tasks in laterQueue after main queue is flushed", (done) => {
        let mainTaskExecuted = false;
        let laterTaskExecuted = false;

        // Schedule a main task
        Q.nextTick(() => {
            mainTaskExecuted = true;
        });

        // Schedule a later task using runAfter
        Q.nextTick.runAfter(() => {
            laterTaskExecuted = true;
            // Both tasks should have executed
            expect(mainTaskExecuted).toBe(true);
            expect(laterTaskExecuted).toBe(true);
            done();
        });

        // Give time for tasks to execute
        setTimeout(() => {
            if (!laterTaskExecuted) {
                fail("Later task was not executed");
                done();
            }
        }, 100);
    });
});