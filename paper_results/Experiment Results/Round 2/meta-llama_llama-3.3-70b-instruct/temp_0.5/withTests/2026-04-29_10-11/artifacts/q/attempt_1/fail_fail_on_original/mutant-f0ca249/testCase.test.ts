import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when trying to reduce an empty array', () => {
        const arrayReduce = Q(array_reduce);
        expect(() => arrayReduce([], function () {}, void 0)).toThrowError();
    });
});