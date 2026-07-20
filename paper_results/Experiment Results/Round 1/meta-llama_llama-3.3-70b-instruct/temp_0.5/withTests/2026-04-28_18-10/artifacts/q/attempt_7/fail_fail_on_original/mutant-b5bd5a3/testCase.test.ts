import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a valueOf method", () => {
        const promise = Q(10);
        const inspected = promise.inspect();
        if (inspected.state === "pending" ||
            inspected.state === "rejected") {
            expect(promise.valueOf()).toBe(promise);
        } else {
            expect(promise.valueOf()).toBe(inspected.value);
        }
    });
});