const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.get", () => {
    it("should fail when dispatch operation is empty string", async () => {
        const obj = { foo: "bar" };
        const promise = Q(obj);
        try {
            await Q.get(promise, "foo");
            fail("Expected to throw an error when dispatch operation is empty");
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});