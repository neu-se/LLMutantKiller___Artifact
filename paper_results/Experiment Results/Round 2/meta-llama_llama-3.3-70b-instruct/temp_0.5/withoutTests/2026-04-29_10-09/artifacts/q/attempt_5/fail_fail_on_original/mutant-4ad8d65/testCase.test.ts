import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall", () => {
    it("should call dispatch with 'apply' as the method name", () => {
        const func = jest.fn();
        const originalDispatch = Q.dispatch;
        Q.dispatch = jest.fn(originalDispatch);
        Q.fcall(func, "a", "b");
        expect(Q.dispatch).toHaveBeenCalledWith(expect.any(Function), "apply", expect.any(Array));
        Q.dispatch = originalDispatch;
    });
});