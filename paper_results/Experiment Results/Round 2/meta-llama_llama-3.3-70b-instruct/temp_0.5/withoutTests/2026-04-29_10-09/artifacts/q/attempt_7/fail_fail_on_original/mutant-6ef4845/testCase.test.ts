import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call fallback when descriptor has no method", () => {
        const descriptor = {
            "when": function (resolve, op, args) {
                throw new Error("Test error");
            }
        };
        const fallback = jest.fn();
        const promise = q.Promise(descriptor, fallback);
        try {
            promise.dispatch("test", []);
        } catch (e) {
            expect(e.message).toBe("Test error");
        }
        expect(fallback).toHaveBeenCalledTimes(1);
        expect(fallback).toHaveBeenCalledWith("test", []);
    });
});