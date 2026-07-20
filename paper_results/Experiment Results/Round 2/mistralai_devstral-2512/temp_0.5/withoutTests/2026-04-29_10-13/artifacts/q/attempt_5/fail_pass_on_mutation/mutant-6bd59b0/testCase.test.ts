const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.get", () => {
    it("should correctly dispatch 'get' operation to retrieve property value", async () => {
        const obj = { foo: "bar" };
        const promise = Q(obj);
        const result = await Q.get(promise, "foo");
        expect(result).toBe("bar");
    });
});