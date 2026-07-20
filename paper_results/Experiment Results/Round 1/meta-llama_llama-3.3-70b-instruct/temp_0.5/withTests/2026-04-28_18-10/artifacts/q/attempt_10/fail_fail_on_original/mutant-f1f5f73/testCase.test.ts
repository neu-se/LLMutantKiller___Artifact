import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
    it("should call the callback with the value when the promise is fulfilled", async () => {
        var callback = jest.fn();
        var originalTap = Q.prototype.tap;
        Q.prototype.tap = function(callback) {
            originalTap.call(this, callback);
            callback("test");
        };
        var promise = Q("foo").tap(callback);
        await promise;
        expect(callback).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenNthCalledWith(1, "foo");
        expect(callback).toHaveBeenNthCalledWith(2, "test");
        Q.prototype.tap = originalTap;
    });
});