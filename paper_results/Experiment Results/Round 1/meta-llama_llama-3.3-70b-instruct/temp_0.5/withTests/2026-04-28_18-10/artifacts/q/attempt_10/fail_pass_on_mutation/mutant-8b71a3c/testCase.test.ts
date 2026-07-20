import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should handle valueOf correctly for rejected promises", () => {
        const promise = q.reject("error");
        const inspected = promise.inspect();
        if (inspected.state === "rejected") {
            expect(promise.valueOf()).toBe(promise);
        } else {
            expect(false).toBe(true);
        }
    });
});