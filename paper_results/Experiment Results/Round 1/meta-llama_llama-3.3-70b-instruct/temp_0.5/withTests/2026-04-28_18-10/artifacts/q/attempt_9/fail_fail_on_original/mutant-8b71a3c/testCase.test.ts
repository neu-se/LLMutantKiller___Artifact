import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should handle valueOf correctly for promises", () => {
        const promise = q(10);
        const inspected = promise.inspect();
        if (inspected.state === "pending") {
            expect(promise.valueOf()).toBe(promise);
        } else if (inspected.state === "rejected") {
            expect(promise.valueOf()).toBe(promise);
        } else {
            expect(promise.valueOf()).not.toBe(promise);
        }
    });
});