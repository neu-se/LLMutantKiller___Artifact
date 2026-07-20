import { Q } from "../../../q.js";

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

    it("should return undefined when nodeify is called", () => {
        var promise = Q(10);
        var result = promise.nodeify(jest.fn());
        expect(result).toBeUndefined();
    });
});