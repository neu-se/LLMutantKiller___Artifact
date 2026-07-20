import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const callback = function () { };
        const promise = Q("foo").fin(callback);
        return promise.then((value: any) => {
            expect(value).toBe("foo");
        });
    });
});