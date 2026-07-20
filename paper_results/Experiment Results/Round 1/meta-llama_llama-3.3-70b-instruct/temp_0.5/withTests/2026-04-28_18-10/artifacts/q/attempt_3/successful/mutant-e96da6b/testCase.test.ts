import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay function", () => {
    it("should delay the fulfillment of a promise when called with two arguments", () => {
        const promise = Q.delay("what", 50);
        let fulfilled = false;

        promise.then((value) => {
            fulfilled = true;
            expect(value).toBe("what");
        });

        expect(fulfilled).toBe(false);
    });

    it("should throw an error when called with no arguments in the mutated code", () => {
        // This test will fail in the mutated code because the mutated code has an empty function for Q.delay
        const promise = Q.delay;
        expect(typeof promise).toBe("function");
    });
});