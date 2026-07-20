import "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should dispatch 'set' with the correct arguments", () => {
        const object = {};
        const key = "testKey";
        const value = "testValue";

        Q.set(object, key, value);

        expect(object[key]).toBe(value);
    });
});