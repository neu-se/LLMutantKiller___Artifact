const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fcall mutation test", () => {
    it("should correctly apply function with proper operation name", async () => {
        const testFn = function(a: number, b: number) {
            return this ? this.value + a + b : a + b;
        };

        const context = { value: 10 };
        const boundFn = testFn.bind(context);

        // This should work with "apply" operation but fail with empty string
        const result = await Q.fcall(boundFn, 5, 3);
        expect(result).toBe(18);
    });
});