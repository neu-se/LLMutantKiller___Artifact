const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fcall mutation test", () => {
    it("should fail when operation name is empty string", async () => {
        const testFn = (a: number) => a * 2;
        const promise = Q.fcall(testFn, 5);

        // The mutation changes "apply" to "" which should cause dispatch to fail
        await expect(promise).rejects.toBeDefined();
    });
});