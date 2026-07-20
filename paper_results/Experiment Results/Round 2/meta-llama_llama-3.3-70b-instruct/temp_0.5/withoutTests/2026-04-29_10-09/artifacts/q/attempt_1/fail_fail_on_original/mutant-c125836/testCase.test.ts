import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allResolved function", () => {
    it("should resolve with an array of promises when all promises are resolved", () => {
        const promises = [Q.resolve(1), Q.resolve(2), Q.resolve(3)];
        return Q.allResolved(promises).then((result) => {
            expect(result).toEqual(promises);
        });
    });

    it("should reject when any of the promises are rejected", () => {
        const promises = [Q.resolve(1), Q.reject(2), Q.resolve(3)];
        return Q.allResolved(promises).then((result) => {
            expect(result).toBeUndefined();
        }).catch((error) => {
            expect(error).toBe(2);
        });
    });
});