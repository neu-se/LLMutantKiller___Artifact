const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fcall mutation test", () => {
    it("should fail when dispatch is called with empty string operation", async () => {
        const testFn = (a: number, b: number) => a + b;
        await expect(Q.fcall(testFn, 2, 3)).rejects.toThrow();
    });
});