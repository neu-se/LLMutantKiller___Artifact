import { Q } from "../../../../../q.js";

describe("Promise", () => {
    it("should call fallback when descriptor has no method", () => {
        const descriptor = {};
        const fallback = jest.fn();
        const promise = Q.Promise(descriptor, fallback);
        promise.promiseDispatch(null, "test", []);
        expect(fallback).toHaveBeenCalledTimes(1);
        expect(fallback).toHaveBeenCalledWith("test", []);
    });
});