import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promised decorator", () => {
    it("should correctly pass arguments to the decorated function", async () => {
        const testFunc = Q.promised(function (a: number, b: number) {
            return a + b;
        });

        const result = await testFunc(3, 5);
        expect(result).toBe(8);
    });
});