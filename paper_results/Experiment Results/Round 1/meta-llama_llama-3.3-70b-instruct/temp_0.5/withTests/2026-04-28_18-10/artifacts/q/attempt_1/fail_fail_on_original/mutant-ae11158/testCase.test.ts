import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nfapply function", () => {
    it("should call the provided callback function with the given arguments", () => {
        const callback = jest.fn();
        Q.nfapply(callback, [1, 2, 3]);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(1, 2, 3);
    });

    it("should return a promise that resolves with the result of the callback function", async () => {
        const callback = jest.fn(() => 42);
        const result = await Q.nfapply(callback, [1, 2, 3]);
        expect(result).toBe(42);
    });

    it("should reject the promise if the callback function throws an error", async () => {
        const callback = jest.fn(() => { throw new Error("Test error"); });
        await expect(Q.nfapply(callback, [1, 2, 3])).rejects.toThrow("Test error");
    });
});