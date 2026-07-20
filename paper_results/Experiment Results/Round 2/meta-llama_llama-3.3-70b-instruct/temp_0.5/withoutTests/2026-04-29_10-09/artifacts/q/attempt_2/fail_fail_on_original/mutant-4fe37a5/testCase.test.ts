const Q = require("../../../../../../../../subject_repositories/q/q");

describe("Promise", () => {
    it("should reject when an unsupported operation is performed", () => {
        const fallbackSpy = jest.fn();
        const promise = Q({
            "when": function () {
                return "value";
            }
        }, fallbackSpy);

        promise.dispatch("unsupportedOperation", []);
        expect(fallbackSpy).toHaveBeenCalledTimes(1);
        expect(fallbackSpy).toHaveBeenCalledWith("unsupportedOperation", []);
    });
});