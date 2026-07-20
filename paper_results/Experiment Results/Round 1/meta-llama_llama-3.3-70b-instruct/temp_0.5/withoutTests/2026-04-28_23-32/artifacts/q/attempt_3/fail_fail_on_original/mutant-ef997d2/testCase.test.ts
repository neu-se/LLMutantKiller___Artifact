import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return a promise with inspect method that returns an object", () => {
        const promise = Q.master({});
        expect(promise.inspect).toBeDefined();
        const inspected = promise.inspect();
        expect(typeof inspected).toBe("object");
    });
});