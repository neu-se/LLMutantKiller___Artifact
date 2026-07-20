const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.get", () => {
    it("should fail when trying to get a property with an empty string operation", async () => {
        const obj = { foo: "bar" };
        const promise = Q(obj);
        await expect(Q.get(promise, "foo")).rejects.toBeDefined();
    });
});