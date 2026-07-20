import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have an inspect method that returns an object with state", () => {
        var promise = Q(10);
        expect(typeof promise.inspect).toBe("function");
        expect(typeof promise.inspect()).toBe("object");
        expect(promise.inspect().state).toBeDefined();
    });
});