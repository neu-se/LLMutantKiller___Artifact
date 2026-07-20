import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should call fallback when promiseDispatch is called with an unknown operation", () => {
        const promise = Q.Promise((resolve, reject) => {
            resolve();
        });
        const error = jest.fn();
        Q(promise).then(() => {}, error);
        promise.promiseDispatch(null, "when", ["unknownOp"]);
        expect(error).toHaveBeenCalledTimes(0);
        promise.promiseDispatch(null, "unknownOp", []);
        expect(error).toHaveBeenCalledTimes(1);
    });
});