import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nfapply", () => {
    it("should call the callback function with the provided arguments", () => {
        const callback = jest.fn();
        const args = [1, 2, 3];
        Q.nfapply(callback, args);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(...args);
    });
});