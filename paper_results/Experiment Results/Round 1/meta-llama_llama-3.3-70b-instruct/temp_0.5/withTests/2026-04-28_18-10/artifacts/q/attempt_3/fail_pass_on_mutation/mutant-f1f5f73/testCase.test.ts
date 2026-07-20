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
});