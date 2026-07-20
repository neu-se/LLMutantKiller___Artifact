import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fin callback validation throws synchronously", () => {
    it("should throw synchronously when callback is not a function", () => {
        let threw = false;
        let errorMessage = "";

        try {
            Q(42)["finally"](42 as any);
        } catch (err: any) {
            threw = true;
            errorMessage = err.message;
        }

        expect(threw).toBe(true);
        expect(errorMessage).toBe("Q can't apply finally callback");
    });
});