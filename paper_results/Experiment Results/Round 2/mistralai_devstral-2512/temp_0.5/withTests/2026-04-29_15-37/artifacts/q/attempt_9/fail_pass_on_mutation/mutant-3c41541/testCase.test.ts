import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del mutation test", () => {
    it("should successfully delete property and verify operation", async () => {
        const obj = { testProp: "testValue" };
        const promise = Q(obj).del("testProp");
        const result = await promise;
        expect(result).toBeUndefined();
        expect(obj.testProp).toBeUndefined();
        expect(obj).not.toHaveProperty("testProp");
    });
});