import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should return a promise with inspect method defined", () => {
        var promise = Q(10);
        expect(promise.inspect).toBeDefined();
    });
});