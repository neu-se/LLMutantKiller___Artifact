import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspect default behavior", () => {
    it("should return state 'unknown' when inspect is not provided to makePromise", () => {
        const promise = Q.makePromise({
            when: function () {
                return "hello";
            }
        });

        // In the original code, inspect defaults to returning {state: "unknown"}
        // In the mutated code, inspect is undefined, so calling promise.inspect() throws
        expect(typeof promise.inspect).toBe("function");
        const result = promise.inspect();
        expect(result).toEqual({ state: "unknown" });
    });
});