import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should return keys of an object', () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).then((value: any) => {
            return Object.keys(value);
        }).then((keys: string[]) => {
            expect(keys).toEqual(['a', 'b']);
        });
    });
});