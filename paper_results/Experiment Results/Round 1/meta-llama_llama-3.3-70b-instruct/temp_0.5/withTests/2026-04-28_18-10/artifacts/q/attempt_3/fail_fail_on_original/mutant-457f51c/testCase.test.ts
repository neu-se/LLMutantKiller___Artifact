import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("mutation test", () => {
    it("should detect the mutation", () => {
        const promise = Q(Promise.resolve());
        promise.valueOf = function () {
            return promise;
        };
        expect(promise.exception).toBeUndefined();
    });
});