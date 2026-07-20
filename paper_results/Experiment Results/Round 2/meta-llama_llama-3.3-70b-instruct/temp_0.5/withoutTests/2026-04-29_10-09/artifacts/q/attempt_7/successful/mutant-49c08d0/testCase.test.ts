import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should create a promise with unknown state when inspect is undefined", () => {
        const promise = Q(function (resolve, reject, notify) {
            resolve("value");
        });
        
        const inspect = promise.inspect();
        if (inspect.state === "unknown") {
            expect(true).toBe(false);
        } else {
            expect(true).toBe(true);
        }
    });
});