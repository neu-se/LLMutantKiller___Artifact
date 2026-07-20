import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = Q.defer().promise;
        const inspected = promise.inspect();
        const valueOf = inspected.state === "pending" || inspected.state === "rejected";
        expect(valueOf).toBe(false);
    });
});