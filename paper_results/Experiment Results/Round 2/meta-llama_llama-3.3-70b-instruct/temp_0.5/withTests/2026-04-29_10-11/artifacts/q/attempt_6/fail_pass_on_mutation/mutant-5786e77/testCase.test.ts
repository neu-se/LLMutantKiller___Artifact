import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise spread method", () => {
    it("should call the spread method", () => {
        var promise = q([1, 2, 3]);
        expect(typeof promise.spread).toBe('function');
    });
});