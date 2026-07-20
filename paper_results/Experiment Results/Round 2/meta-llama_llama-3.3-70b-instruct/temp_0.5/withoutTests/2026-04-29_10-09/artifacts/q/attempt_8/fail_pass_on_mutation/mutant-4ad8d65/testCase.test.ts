import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fcall", () => {
    it("should call the dispatch method with 'apply' as the method name", () => {
        const func = jest.fn();
        const originalDispatch = Q.dispatch;
        Q.dispatch = jest.fn(originalDispatch);
        Q.fcall(func, "a", "b");
        expect(Q.dispatch).toHaveBeenCalledTimes(0);
        Q.dispatch = originalDispatch;
    });
});