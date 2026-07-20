import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify function", () => {
    it("should call the nodeback with the resolved value", () => {
        var spy = jest.fn();
        var promise = Q(10);
        promise.nodeify(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(null, 10);
    });

    it("should call the nodeback with the rejected error", () => {
        var spy = jest.fn();
        var promise = Q.reject(new Error("Test error"));
        promise.nodeify(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(new Error("Test error"));
    });

    it("should return the promise if no nodeback is provided", () => {
        var promise = Q(10);
        var result = promise.nodeify();
        expect(result).toBe(promise);
    });
});