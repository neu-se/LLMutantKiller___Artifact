import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.js", () => {
    it("should test the behavior of the mutated file", async () => {
        let executed = false;
        Q.nextTick(() => {
            executed = true;
        });
        
        // Check if the task was not executed yet
        expect(executed).toBe(false);

        // Wait for a short period of time
        await new Promise(resolve => global.setTimeout(resolve, 10));

        // Check if the task was executed
        expect(executed).toBe(true);
    });
});