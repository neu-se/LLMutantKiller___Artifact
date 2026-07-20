const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.get", () => {
    it("should correctly use 'get' operation in dispatch", async () => {
        const obj = { testProp: "testValue" };
        const promise = Q(obj);
        const result = await promise.get("testProp");
        expect(result).toBe("testValue");
    });
});