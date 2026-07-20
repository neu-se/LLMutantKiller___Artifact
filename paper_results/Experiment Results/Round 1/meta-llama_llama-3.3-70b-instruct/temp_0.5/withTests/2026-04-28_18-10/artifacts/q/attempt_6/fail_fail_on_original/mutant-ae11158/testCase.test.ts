import { Q } from "../../../../../q";

describe("Q.nfapply function", () => {
    it("should call the provided callback function with the given arguments", () => {
        const callback = jest.fn();
        Q.nfapply(callback, [1, 2, 3]);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(1, 2, 3);
    });
});