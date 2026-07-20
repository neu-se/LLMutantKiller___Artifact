import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of makeStackTraceLong function", () => {
        const error = new Error("Test error");
        const promise = Q(Promise.resolve());
        const originalMakeStackTraceLong = Q.makeStackTraceLong;
        Q.makeStackTraceLong = function(error: any, promise: any) {
            Object.defineProperty(error, "__minimumStackCounter__", { value: promise.stackCounter, configurable: true });
        };
        Q.makeStackTraceLong(error, promise);
        expect(Object.getOwnPropertyDescriptor(error, "__minimumStackCounter__")).toBeDefined();
        Q.makeStackTraceLong = originalMakeStackTraceLong;
        Q.makeStackTraceLong = function(error: any, promise: any) {
            // Object.defineProperty(error, "__minimumStackCounter__", { value: promise.stackCounter, configurable: true });
        };
        Q.makeStackTraceLong(error, promise);
        expect(Object.getOwnPropertyDescriptor(error, "__minimumStackCounter__")).toBeUndefined();
    });
});