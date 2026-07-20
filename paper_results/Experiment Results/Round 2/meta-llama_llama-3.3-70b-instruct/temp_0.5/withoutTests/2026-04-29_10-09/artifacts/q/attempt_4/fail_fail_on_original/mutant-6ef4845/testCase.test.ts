import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call fallback when descriptor has no method", () => {
        const descriptor = {};
        const fallback = jest.fn();
        const promise = Q.Promise(descriptor, fallback, () => ({}));
        const result = promise.dispatch("test", []);
        expect(fallback).toHaveBeenCalledTimes(1);
        expect(fallback).toHaveBeenCalledWith("test", []);
    });
});