import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.post behavior with null name", () => {
    it("should apply the function when name is null", async () => {
        const testFn = (a: number, b: number, c: number) => a + b + c;
        const result = await Q(testFn).post(null, [1, 2, 3]);
        expect(result).toBe(6);
    });
});