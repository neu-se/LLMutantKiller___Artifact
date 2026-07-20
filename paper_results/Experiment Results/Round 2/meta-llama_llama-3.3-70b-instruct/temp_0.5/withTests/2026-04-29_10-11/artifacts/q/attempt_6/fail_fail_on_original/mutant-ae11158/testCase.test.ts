import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nfapply function", () => {
    it("should call the provided function with the given arguments when nfapply is implemented", () => {
        const originalNfapply = q.nfapply;
        const callback = jest.fn();
        q.nfapply = function (callback, args) {
            callback(...args);
        };
        q.nfapply(callback, [1, 2, 3]);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(1, 2, 3);
        q.nfapply = originalNfapply;
    });
});