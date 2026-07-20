import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nfapply function", () => {
    it("should call the callback with the provided arguments", () => {
        const callback = jest.fn();
        Q.nfapply(callback, [1, 2, 3]);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(1, 2, 3);
    });

    it("should return a promise that resolves with the callback's return value", async () => {
        const callback = jest.fn(() => 42);
        const promise = Q.nfapply(callback, [1, 2, 3]);
        const result = await promise;
        expect(result).toBe(42);
    });

    it("should reject the promise if the callback throws an error", async () => {
        const callback = jest.fn(() => { throw new Error("Test error"); });
        const promise = Q.nfapply(callback, [1, 2, 3]);
        await expect(promise).rejects.toThrow("Test error");
    });
});