import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", async () => {
        // The mutation is in the nextTick function, which uses setImmediate in modern browsers.
        // We can test this by checking if the nextTick function behaves as expected.
        const start = Date.now();
        let executed = false;
        Q.nextTick(() => {
            executed = true;
        });
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(executed).toBe(true);
        expect(Date.now() - start).toBeGreaterThan(10);
    });
});