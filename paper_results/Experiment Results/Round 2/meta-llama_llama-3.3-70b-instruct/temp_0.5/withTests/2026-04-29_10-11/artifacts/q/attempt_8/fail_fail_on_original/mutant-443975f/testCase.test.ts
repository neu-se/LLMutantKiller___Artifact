const Q = require("../../../../../../../../../subject_repositories/q/q.js");

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

    it("should throw an error when nextTick is not properly set up", (done) => {
        // Make Q.nextTick throw an error
        const originalNextTick = Q.nextTick;
        Q.nextTick = () => {
            throw new Error("nextTick is not properly set up");
        };

        try {
            Q.nextTick(() => {});
            expect(true).toBe(false);
        } catch (error) {
            expect(error.message).toBe("nextTick is not properly set up");
        } finally {
            // Restore the original nextTick function
            Q.nextTick = originalNextTick;
            done();
        }
    });
});