import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall mutation test", () => {
    it("should correctly apply a function with arguments", async () => {
        const testFn = (a: number, b: number) => a + b;
        const result = await Q.fcall(testFn, 2, 3);
        expect(result).toBe(5);
    });
});