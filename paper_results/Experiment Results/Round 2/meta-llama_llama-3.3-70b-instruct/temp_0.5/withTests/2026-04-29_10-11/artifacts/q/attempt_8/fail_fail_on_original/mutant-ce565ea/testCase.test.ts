import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = Q.defer().promise;
        const inspected = promise.inspect();
        expect(inspected.state).toBe("pending");
        promise.resolve(10);
        const valueOf = promise.valueOf();
        expect(valueOf).toBe(10);
    });
});