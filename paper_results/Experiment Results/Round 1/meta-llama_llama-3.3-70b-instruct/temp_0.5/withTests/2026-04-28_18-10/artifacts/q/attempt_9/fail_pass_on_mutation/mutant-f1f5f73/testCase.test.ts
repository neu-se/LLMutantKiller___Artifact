import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
    it("should call the callback with the value when the promise is fulfilled", async () => {
        var callback = jest.fn();
        var promise = Q("foo").tap(callback);
        await promise;
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith("foo");
        expect(promise.then().then((value) => value)).resolves.toBe("foo");
    });
});