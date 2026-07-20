import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q function", () => {
    it("should result in a fulfilled promise when given a value", () => {
        const promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
    });

    it("should be the identity when given promise", () => {
        const f = Q(5);
        const r = Q.reject(new Error("aaargh"));
        const p = Q.promise(() => {});

        expect(Q(f)).toBe(f);
        expect(Q(r)).toBe(r);
        expect(Q(p)).toBe(p);
    });

    it("deprecate function should warn with correct message", () => {
        const originalWarn = console.warn;
        const warnSpy = jest.fn();
        console.warn = warnSpy;

        const deprecatedFunction = Q.deprecate(() => {}, "testFunction", "alternativeFunction");
        deprecatedFunction();

        expect(warnSpy).toHaveBeenCalledWith("testFunction is deprecated, use alternativeFunction instead.", new Error().stack);

        console.warn = originalWarn;
    });
});