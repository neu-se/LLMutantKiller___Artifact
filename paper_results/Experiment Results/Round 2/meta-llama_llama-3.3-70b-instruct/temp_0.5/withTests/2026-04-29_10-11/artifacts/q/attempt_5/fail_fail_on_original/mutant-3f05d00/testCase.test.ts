import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have a finally method on the Promise prototype", () => {
        const promise = Q("foo");
        expect(promise.finally).toBeDefined();
        promise.finally(() => {});
    });
});