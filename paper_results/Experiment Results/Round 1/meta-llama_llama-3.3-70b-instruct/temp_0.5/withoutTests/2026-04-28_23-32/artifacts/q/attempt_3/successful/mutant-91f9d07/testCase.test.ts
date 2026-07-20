import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should return a function when callback is defined", () => {
        const callback = () => {};
        const denodeified = Q.denodeify(callback);
        expect(typeof denodeified).toBe("function");
    });

    it("should not call the callback function when it is undefined in the original code", () => {
        const originalDenodeify = Q.denodeify;
        const callback = undefined;
        expect(() => originalDenodeify(callback)).toThrowError();
    });
});