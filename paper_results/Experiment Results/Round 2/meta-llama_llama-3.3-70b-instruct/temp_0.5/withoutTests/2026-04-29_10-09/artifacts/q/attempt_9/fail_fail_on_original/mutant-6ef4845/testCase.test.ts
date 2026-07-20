import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call fallback when descriptor has no method", () => {
        const descriptor = {};
        const fallback = jest.fn((op: any, args: any) => {
            return q.Promise({
                "when": function (resolve: any, op: any, args: any) {
                    resolve("fallback called");
                }
            });
        });
        const promise = q.Promise(descriptor, fallback);
        const result = promise.dispatch("test", []);
        expect(fallback).toHaveBeenCalledTimes(1);
        expect(fallback).toHaveBeenCalledWith("test", []);
        result.then((value: any) => {
            expect(value).toBe("fallback called");
        });
    });
});