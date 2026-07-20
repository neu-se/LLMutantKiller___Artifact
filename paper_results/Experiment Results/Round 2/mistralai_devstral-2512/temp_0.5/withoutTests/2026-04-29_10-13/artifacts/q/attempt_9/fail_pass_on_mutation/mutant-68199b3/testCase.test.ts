const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fcall mutation test", () => {
    it("should correctly apply function using dispatch with 'apply' operation", async () => {
        const testObj = {
            value: 20,
            getValue: function() {
                return this.value;
            }
        };
        const result = await Q.fcall(testObj.getValue.bind(testObj));
        expect(result).toBe(20);

        // Verify the operation is correctly handled by checking the promise chain
        const promise = Q.fcall(() => 42);
        await expect(promise).resolves.toBe(42);
    });
});