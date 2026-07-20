import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fin callback validation", () => {
    it("should set threw to true when fin is called with an invalid callback and throw an error", () => {
        let threw = false;

        try {
            (Q() as any).fin(undefined);
        } catch (err: any) {
            expect(err.message).toBe("Q can't apply finally callback");
            threw = true;
        }

        expect(threw).toBe(true);
    });
});