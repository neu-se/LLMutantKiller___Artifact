import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
    it("should call the callback with the value when the promise is fulfilled", () => {
        var called = false;
        var value = "foo";
        var callback = jest.fn();
        return Q(value).tap(callback).then(() => {
            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith(value);
        });
    });
});