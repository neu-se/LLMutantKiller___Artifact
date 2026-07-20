import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
    it("should call the callback with the value when the promise is fulfilled", async () => {
        var callback = jest.fn();
        await Q("foo").tap(callback);
        expect(callback.mock.calls[0][0]).toBe("foo");
    });
});