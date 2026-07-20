import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = Q(1);
        const onUnhandledError = jest.fn();
        promise.done(() => {
            onUnhandledError();
        }, () => {
            onUnhandledError();
        });
        expect(onUnhandledError).toHaveBeenCalledTimes(1);
    });
});