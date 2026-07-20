import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.js", () => {
    it("should test the behavior of the mutated file", async () => {
        let executed = false;
        let started = false;
        const originalMessageChannel = global.MessageChannel;
        global.MessageChannel = undefined;
        Q.nextTick(() => {
            executed = true;
        });
        
        // Check if the task was not executed yet
        expect(executed).toBe(false);
        started = true;

        // Wait for the next tick
        await new Promise(resolve => global.setTimeout(resolve, 0));

        // Check if the task was executed
        expect(executed).toBe(true);
        expect(started).toBe(true);
        global.MessageChannel = originalMessageChannel;
    });
});