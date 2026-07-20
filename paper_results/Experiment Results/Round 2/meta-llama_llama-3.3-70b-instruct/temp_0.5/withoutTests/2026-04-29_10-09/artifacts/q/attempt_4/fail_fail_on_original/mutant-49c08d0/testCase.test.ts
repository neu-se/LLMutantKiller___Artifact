import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should create a promise with unknown state when inspect is undefined", () => {
        const promise = Q({
            "when": function (fulfilled: (value: any) => void, rejected: (reason: any) => void) {
                return fulfilled("value");
            },
        });
        
        const inspect = promise.inspect();
        if (inspect.state === "unknown") {
            expect(inspect.state).toBe("unknown");
        } else {
            expect(true).toBe(false);
        }
    });
});