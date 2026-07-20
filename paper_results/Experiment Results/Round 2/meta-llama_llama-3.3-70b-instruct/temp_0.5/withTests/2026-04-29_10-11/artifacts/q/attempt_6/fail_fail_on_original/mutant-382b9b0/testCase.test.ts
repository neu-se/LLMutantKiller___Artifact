import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify function", () => {
    it("should call the nodeback with the resolved value and return the promise", () => {
        var spy = jest.fn();
        var promise = Q(10);
        var result = promise.nodeify(spy);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(null, 10);
        expect(result).toBe(promise);
    });
});