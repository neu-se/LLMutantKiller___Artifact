import { Q } from "../../../q.js";

describe("Q.nfapply function", () => {
    it("should call the provided callback function with the given arguments and return a promise", async () => {
        const callback = jest.fn(() => 42);
        const promise = Q.nfapply(callback, [1, 2, 3]);
        expect(typeof promise.then).toBe('function');
        const result = await promise;
        expect(result).toBe(42);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(1, 2, 3);
    });
});