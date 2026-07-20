import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when ses is ok", () => {
        // We need to mock the ses object to test the behavior
        (global as any).ses = { ok: () => false };

        expect(() => {
            Q(null);
        }).toThrowError();

        // Restore the original ses object
        delete (global as any).ses;
    });
});