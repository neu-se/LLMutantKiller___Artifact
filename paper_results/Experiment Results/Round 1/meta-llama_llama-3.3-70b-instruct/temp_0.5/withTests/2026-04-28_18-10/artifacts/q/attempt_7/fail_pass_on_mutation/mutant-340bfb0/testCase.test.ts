import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle makeStackTraceLong", () => {
        const error = new Error();
        const promise = Q(1);
        const originalDefineProperty = Object.defineProperty;
        Object.defineProperty(error, "__minimumStackCounter__", {value: 1, configurable: true});
        expect(error.__minimumStackCounter__).toBe(1);
    });
});