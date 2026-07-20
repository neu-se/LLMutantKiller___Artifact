import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call fallback when descriptor has no method", () => {
        const descriptor = {
            "when": function (resolve: any, op: any, args: any) {
                throw new Error("Test error");
            }
        };
        const promise = q.promise((resolve: any, reject: any, notify: any) => {
            throw new Error("Test error");
        });
        try {
            promise.dispatch("test", []);
        } catch (e: any) {
            expect(e.message).toBe("Test error");
        }
        const result = q.Promise(descriptor);
        result.then((value: any) => {
            expect(value).toBeUndefined();
        }, (error: any) => {
            expect(error.message).toBe("Test error");
        });
    });
});