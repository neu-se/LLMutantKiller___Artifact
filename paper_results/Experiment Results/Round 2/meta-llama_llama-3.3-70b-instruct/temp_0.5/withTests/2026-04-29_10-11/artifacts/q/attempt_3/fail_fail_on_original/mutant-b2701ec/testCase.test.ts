import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should inspect a promise correctly", () => {
        var promise = Q.defer().promise;
        expect(promise.inspect()).toEqual({ state: "pending" });
        Q.defer().resolve(promise);
        expect(promise.inspect()).toEqual({ state: "pending" });
    });
});