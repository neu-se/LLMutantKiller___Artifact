import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of makeStackTraceLong function", () => {
        const error = new Error("Test error");
        const promise = Q();
        const stackCounter = 1;
        const minimumStackCounter = { value: stackCounter, configurable: true };
        Object.defineProperty(error, "__minimumStackCounter__", minimumStackCounter);
        const expectedValue = promise.stackCounter;
        expect(expectedValue).toBe(stackCounter);
    });
});