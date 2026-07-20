import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle a promise', () => {
        const promise = Q("test");
        const result = promise.then((value) => {
            if (value === "test") {
                throw new Error("Test value");
            }
            return value;
        });
        expect(result).rejects.toThrowError("Test value");
    });
});