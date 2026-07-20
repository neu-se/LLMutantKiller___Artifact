import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a valueOf method", () => {
        const promise = Q(10);
        expect(typeof promise.valueOf).toBe("function");
    });
});