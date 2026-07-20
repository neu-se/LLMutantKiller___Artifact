import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
    it("should execute a task in the next event loop iteration", (done) => {
        let executed = false;
        Q.nextTick(() => {
            executed = true;
        });
        expect(executed).toBe(false);
        // Force the event loop to proceed to the next iteration
        setTimeout(() => {
            expect(executed).toBe(true);
            done();
        }, 0);
    });
});