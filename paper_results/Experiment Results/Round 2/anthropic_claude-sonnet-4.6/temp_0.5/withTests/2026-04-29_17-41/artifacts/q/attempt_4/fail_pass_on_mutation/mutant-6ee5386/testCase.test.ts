import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
    it("should call the callback and pass through the original value", () => {
        let callbackCalled = false;

        return Q.when(
            (Q as any).tap(Q("originalValue"), function (value: any) {
                callbackCalled = true;
                expect(value).toBe("originalValue");
            }),
            function (result: any) {
                expect(callbackCalled).toBe(true);
                expect(result).toBe("originalValue");
            }
        );
    });
});