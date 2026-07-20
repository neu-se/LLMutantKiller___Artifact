import { Q } from "./q.js";

describe("Q.fcall mutation test", () => {
    it("should correctly apply a function with arguments", async () => {
        const testFn = jest.fn((a: number, b: number) => a + b);
        const result = await Q.fcall(testFn, 2, 3);
        expect(result).toBe(5);
        expect(testFn).toHaveBeenCalledWith(2, 3);
    });
});