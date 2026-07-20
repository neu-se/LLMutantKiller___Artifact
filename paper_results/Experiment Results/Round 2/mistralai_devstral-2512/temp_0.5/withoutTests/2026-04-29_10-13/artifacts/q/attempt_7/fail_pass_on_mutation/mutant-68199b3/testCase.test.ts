const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fcall mutation test", () => {
    it("should correctly apply function and distinguish from empty operation", async () => {
        const testFn = (a: number, b: number) => a * b;
        const result = await Q.fcall(testFn, 3, 4);
        expect(result).toBe(12);

        // This verifies the operation name is correctly passed to dispatch
        const promise = Q.fcall(testFn, 3, 4);
        await expect(promise).resolves.toBe(12);
    });
});