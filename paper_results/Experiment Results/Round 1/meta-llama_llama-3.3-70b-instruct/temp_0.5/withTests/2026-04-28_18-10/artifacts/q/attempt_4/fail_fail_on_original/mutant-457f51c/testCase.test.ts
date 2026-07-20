import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("mutation test", () => {
    it("should detect the mutation", () => {
        const promise = Q(Promise.reject(new Error()));
        const inspected = promise.inspect();
        if (inspected.state === "rejected") {
            expect(promise.exception).toBeDefined();
        } else {
            expect(promise.exception).toBeUndefined();
        }
    });
});