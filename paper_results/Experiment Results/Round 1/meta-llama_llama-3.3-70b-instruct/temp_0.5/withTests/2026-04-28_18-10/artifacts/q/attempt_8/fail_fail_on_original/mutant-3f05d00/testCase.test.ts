import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        var promise = Q.resolve();
        expect(promise.finally).toBeDefined();
        promise.finally(() => {});
    });
});