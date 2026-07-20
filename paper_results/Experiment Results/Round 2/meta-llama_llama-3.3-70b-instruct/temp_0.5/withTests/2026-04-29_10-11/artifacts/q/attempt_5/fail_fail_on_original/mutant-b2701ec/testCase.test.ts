import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should create a promise", () => {
        var promise = Q.defer().promise;
        expect(promise).toBeDefined();
    });
});