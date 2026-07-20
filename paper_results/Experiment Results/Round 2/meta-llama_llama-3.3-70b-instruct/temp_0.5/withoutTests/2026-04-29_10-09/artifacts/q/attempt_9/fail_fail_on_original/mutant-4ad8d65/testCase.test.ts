import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall", () => {
    it("should call dispatch with 'apply' as the method name", () => {
        const func = jest.fn();
        const originalDispatch = Q.dispatch;
        Q.dispatch = jest.fn(originalDispatch);
        Q.fcall(func, "a", "b");
        expect(Q.dispatch).toHaveBeenCalledTimes(0);
        Q.dispatch = originalDispatch;
        const originalFcall = Q.fcall;
        Q.fcall = function(object, ...args) {
            Q.dispatch(object, "apply", args);
        };
        Q.fcall(func, "a", "b");
        expect(Q.dispatch).toHaveBeenCalledTimes(1);
        expect(Q.dispatch.mock.calls[0][1]).toBe("apply");
        Q.fcall = originalFcall;
        Q.dispatch = originalDispatch;
    });
});