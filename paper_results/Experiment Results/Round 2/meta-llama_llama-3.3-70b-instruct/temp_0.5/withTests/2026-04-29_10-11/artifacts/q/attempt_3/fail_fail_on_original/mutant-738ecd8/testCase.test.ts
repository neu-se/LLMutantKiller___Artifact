import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should throw an error when the promises are not the same", () => {
        var promise = Q(1).join(Q(2));
        expect(promise.then).toThrow();
    });
});