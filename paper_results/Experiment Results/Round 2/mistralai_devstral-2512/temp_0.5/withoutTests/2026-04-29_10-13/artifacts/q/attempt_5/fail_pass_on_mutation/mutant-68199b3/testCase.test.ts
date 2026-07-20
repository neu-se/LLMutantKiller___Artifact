const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fcall mutation test", () => {
    it("should correctly apply function with context", async () => {
        const context = { value: 42 };
        const testFn = function(this: typeof context, a: number) {
            return this.value + a;
        };
        const result = await Q.fcall(testFn.bind(context), 8);
        expect(result).toBe(50);
    });
});