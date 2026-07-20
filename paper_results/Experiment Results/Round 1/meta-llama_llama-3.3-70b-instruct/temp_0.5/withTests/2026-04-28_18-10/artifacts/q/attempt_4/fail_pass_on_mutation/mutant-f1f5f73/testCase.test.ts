import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
    it("should call the callback with the value when the promise is fulfilled", () => {
        var called = false;
        var value = "foo";
        return Q(value).tap((val: any) => {
            called = true;
            expect(val).toBe(value);
        }).then(() => {
            expect(called).toBe(true);
        });
    });

    it("should not call the callback when the promise is rejected", () => {
        var called = false;
        var error = new Error("bar");
        return Q.reject(error).tap(() => {
            called = true;
        }).then(null, () => {
            expect(called).toBe(false);
        });
    });

    it("should return a promise that fulfills with the original value", () => {
        var value = "foo";
        return Q(value).tap(() => {}).then((result: any) => {
            expect(result).toBe(value);
        });
    });

    it("should return a promise that rejects with the original reason", () => {
        var error = new Error("bar");
        return Q.reject(error).tap(() => {}).then(null, (reason: any) => {
            expect(reason).toBe(error);
        });
    });
});