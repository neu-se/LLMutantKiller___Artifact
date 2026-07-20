import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick", () => {
    it("should execute a task in a future turn of the event loop", (done) => {
        let executed = false;
        Q.nextTick(() => {
            executed = true;
        });
        expect(executed).toBe(false);
        setTimeout(() => {
            expect(executed).toBe(true);
            done();
        }, 10);
    });
});