import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should create a promise with unknown state when inspect is undefined", () => {
        const promise = Q({
            "when": function (fulfilled, rejected) {
                return fulfilled("value");
            },
        }, void 0, function inspect() {
            return { state: "unknown" };
        });
        
        const inspect = promise.inspect();
        expect(inspect.state).toBe("unknown");
    });
});