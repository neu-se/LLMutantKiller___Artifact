import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should return keys of an object without the string "Stryker was here"', () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).then((value: any) => {
            return Object.keys(value);
        }).then((keys: string[]) => {
            expect(keys).not.toContain("Stryker was here");
        });
    });
});