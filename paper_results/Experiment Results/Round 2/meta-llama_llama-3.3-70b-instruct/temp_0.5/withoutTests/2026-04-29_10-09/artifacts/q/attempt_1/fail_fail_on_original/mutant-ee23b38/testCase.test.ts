import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly set a property on a promise", () => {
        const promise = Q({ foo: "bar" });
        promise.set("foo", "baz");
        return promise.then((value) => {
            expect(value.foo).toBe("baz");
        });
    });
});