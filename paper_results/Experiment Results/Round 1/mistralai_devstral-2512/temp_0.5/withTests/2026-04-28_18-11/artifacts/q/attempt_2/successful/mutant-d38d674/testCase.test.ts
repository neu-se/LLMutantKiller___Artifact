import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise fallback behavior", () => {
    it("should use fallback when descriptor is missing an operation", () => {
        const fallback = jest.fn(() => Q.resolve("fallback result"));
        const promise = Q.makePromise({}, fallback);

        return promise.dispatch("nonexistent", []).then((result: any) => {
            expect(fallback).toHaveBeenCalledWith("nonexistent", []);
            expect(result).toBe("fallback result");
        });
    });
});