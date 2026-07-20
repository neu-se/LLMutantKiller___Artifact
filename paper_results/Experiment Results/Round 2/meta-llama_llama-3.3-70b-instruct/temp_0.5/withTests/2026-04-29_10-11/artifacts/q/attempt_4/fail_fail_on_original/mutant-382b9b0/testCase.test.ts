import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify function", () => {
    it("should call the nodeback with the resolved value and return undefined", () => {
        var spy = jest.fn();
        var promise = Q(10);
        var result = promise.nodeify(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(null, 10);
        expect(result).toBeUndefined();
    });

    it("should call the nodeback with the rejected error and return undefined", () => {
        var spy = jest.fn();
        var promise = Q.reject(new Error("Test error"));
        var result = promise.nodeify(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(new Error("Test error"));
        expect(result).toBeUndefined();
    });
});