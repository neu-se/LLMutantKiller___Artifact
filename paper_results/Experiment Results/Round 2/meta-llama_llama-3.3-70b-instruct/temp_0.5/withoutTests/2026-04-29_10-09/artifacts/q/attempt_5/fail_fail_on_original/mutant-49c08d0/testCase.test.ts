import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should create a promise with unknown state when inspect is undefined", () => {
        const promise = Q({
            "when": function (fulfilled: (value: any) => void, rejected: (reason: any) => void) {
                return fulfilled("value");
            },
        }, undefined, function inspect() {
            return { state: "unknown" };
        });
        
        const inspect = promise.inspect();
        expect(inspect.state).toBe("unknown");
    });
});