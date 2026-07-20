import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have an inspect method", () => {
        var promise = Q(10);
        expect(typeof promise.inspect).toBe("function");
    });
});