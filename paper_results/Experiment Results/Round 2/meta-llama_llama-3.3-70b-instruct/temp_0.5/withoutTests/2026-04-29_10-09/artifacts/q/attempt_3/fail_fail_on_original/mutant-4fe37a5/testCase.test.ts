import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should reject when an unsupported operation is performed", () => {
        const promise = Q({
            "when": function () {
                return "value";
            }
        });

        const fallbackSpy = jest.fn();
        promise.promiseDispatch(fallbackSpy, "unsupportedOperation", []);

        expect(fallbackSpy).toHaveBeenCalledTimes(1);
    });
});