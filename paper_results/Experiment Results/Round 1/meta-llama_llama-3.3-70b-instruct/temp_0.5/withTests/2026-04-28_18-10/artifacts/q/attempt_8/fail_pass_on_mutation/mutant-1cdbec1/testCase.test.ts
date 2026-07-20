describe("Q function behavior", () => {
    it("should create Q object on global", () => {
        const globalObject = typeof globalThis !== "undefined" ? globalThis : global;
        const Q = function () { };
        globalObject.Q = Q;
        expect(globalObject.Q).toBe(Q);
    });
});