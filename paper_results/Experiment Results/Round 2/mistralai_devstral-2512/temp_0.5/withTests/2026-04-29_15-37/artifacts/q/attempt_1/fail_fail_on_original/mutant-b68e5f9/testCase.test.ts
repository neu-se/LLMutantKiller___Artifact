// Test case to detect the mutation in the nodeify method
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify mutation test", () => {
    it("should return the promise when no nodeback is provided", () => {
        const promise = Q.resolve(42);
        const result = promise.nodeify();
        expect(result).toBe(promise);
    });
});