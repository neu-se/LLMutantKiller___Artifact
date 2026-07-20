import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("nodeify function", () => {
    it("should call the callback with the resolved value", () => {
        var spy = jest.fn();
        Q(10).nodeify(spy);
        expect(spy).toHaveBeenCalledWith(null, 10);
    });

    it("should call the callback with the rejected error", () => {
        var spy = jest.fn();
        Q.reject(new Error("Test error")).nodeify(spy);
        expect(spy).toHaveBeenCalledWith(new Error("Test error"));
    });

    it("should return a promise if no callback is provided", () => {
        var promise = Q(10).nodeify();
        expect(promise.then).toBeInstanceOf(Function);
    });
});