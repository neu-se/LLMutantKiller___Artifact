import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly set a property on a promise", () => {
        const promise = Q({ foo: "bar" });
        const result = promise.set("foo", "baz");
        return result.then((value) => {
            expect(value).toBeUndefined();
        });
    });
});