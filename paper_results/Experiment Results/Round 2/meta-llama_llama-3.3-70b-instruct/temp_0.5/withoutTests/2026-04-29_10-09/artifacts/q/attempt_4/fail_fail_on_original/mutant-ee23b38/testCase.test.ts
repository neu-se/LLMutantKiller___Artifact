import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly set a property on a promise", () => {
        const promise = q({ foo: "bar" });
        const result = promise.set("foo", "baz");
        expect(typeof result.then).toBe('function');
    });
});