import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the callback in tap method", () => {
        const callback = jest.fn();
        const promise = Q.resolve();
        Q(promise).tap(callback);
        promise.then(() => {
            expect(callback).toHaveBeenCalledTimes(1);
        });
        // Add a small delay to ensure the promise is resolved before checking the callback
        setTimeout(() => {
            expect(callback).toHaveBeenCalledTimes(1);
        }, 10);
    });
});