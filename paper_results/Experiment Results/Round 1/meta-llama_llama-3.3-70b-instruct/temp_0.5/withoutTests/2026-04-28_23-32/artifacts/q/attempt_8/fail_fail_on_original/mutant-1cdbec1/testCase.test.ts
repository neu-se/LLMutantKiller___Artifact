describe("Q", () => {
    it("should create a global Q object when executed as a script with window defined and self defined", () => {
        (globalThis as any).window = {};
        (globalThis as any).self = {};
        const originalQ = (globalThis as any).Q;
        delete (globalThis as any).Q;
        require("../../../../../../../../../../../subject_repositories/q/q");
        expect((globalThis as any).Q).toBeDefined();
        (globalThis as any).Q = originalQ;
    });
});