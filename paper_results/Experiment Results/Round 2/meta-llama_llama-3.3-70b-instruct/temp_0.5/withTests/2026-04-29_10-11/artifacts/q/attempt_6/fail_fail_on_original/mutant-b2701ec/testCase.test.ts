import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should inspect a promise correctly", () => {
        var promise = Q.defer().promise;
        var inspected = promise.inspect();
        expect(inspected).toBeDefined();
        expect(inspected.state).toBe("pending");
    });
});