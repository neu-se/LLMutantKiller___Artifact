import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should call fallback when promiseDispatch is called with an unknown operation", () => {
        const descriptor = {
            "when": () => {}
        };
        const promise = Q.Promise(descriptor, (op) => {
            if (op === "unknownOp") {
                throw new Error("Unknown operation");
            }
        });
        const error = jest.fn();
        Q(promise).then(() => {}, error);
        promise.promiseDispatch(null, "unknownOp", []);
        expect(error).toHaveBeenCalledTimes(1);
        expect(error).toHaveBeenCalledWith(new Error("Unknown operation"));
    });
});