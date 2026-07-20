import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del mutation test", () => {
    it("should dispatch delete operation with correct parameters", async () => {
        const obj = { a: 10 };
        const promise = Q(obj).del("a");
        const result = await promise;
        expect(result).toBeUndefined();
        expect(obj).not.toHaveProperty("a");

        // Test that the operation was actually a delete operation
        const testObj = { b: 20 };
        const testPromise = Q(testObj).del("b");
        await testPromise;
        expect(testObj).not.toHaveProperty("b");
    });
});