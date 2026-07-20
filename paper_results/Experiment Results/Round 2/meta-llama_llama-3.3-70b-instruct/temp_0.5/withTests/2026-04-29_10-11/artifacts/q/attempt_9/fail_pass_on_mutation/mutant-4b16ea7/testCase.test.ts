import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", async () => {
        // The mutation is in the nextTick function, which uses setImmediate in modern browsers.
        // We can test this by checking if the nextTick function behaves as expected.
        let count = 0;
        Q.nextTick(() => {
            count++;
        });
        Q.nextTick(() => {
            count++;
        });
        expect(count).toBe(0);
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(count).toBe(2);
    });
});