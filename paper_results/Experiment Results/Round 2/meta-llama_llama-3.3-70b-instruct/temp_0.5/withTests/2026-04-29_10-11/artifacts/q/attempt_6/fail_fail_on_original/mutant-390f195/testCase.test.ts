import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create a promise", () => {
        const promise = Q(10);
        expect(promise.then).toBeDefined();
    });

    it("should reject a promise", () => {
        const promise = Q.reject("error");
        expect(promise.catch).toBeDefined();
    });
});