import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the callback in tap method", () => {
        const callback = jest.fn();
        const promise = Q.resolve();
        Q(promise).tap(callback);
        expect(callback).toHaveBeenCalledTimes(0); // This should fail on the original code
    });
});