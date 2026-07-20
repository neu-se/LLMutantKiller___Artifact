import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should return a promise that can be inspected", () => {
        var promise = Q(10);
        expect(promise.inspect()).toEqual({ state: "fulfilled", value: 10 });
    });
});