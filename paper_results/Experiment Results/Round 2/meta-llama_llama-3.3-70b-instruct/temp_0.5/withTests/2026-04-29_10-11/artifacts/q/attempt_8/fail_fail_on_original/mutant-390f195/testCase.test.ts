import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should create a promise with a stack trace", () => {
        const error = new Error();
        const promise = Q.reject(error);
        const stack = promise.catch((e) => e.stack);
        expect(stack).toBeDefined();
    });
});