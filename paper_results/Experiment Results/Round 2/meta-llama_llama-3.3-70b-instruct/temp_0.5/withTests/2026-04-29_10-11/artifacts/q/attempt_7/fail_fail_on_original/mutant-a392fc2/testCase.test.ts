import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = Q("foo").fin(function () { throw new Error("Test Error"); });
        return promise.then((value: any) => {
            expect(true).toBe(false);
        }).catch((error: any) => {
            expect(error.message).toBe("Test Error");
        });
    });
});