import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q.fcall', () => {
    it('should call a function with correct arguments', () => {
        const func = jest.fn((a, b, c) => a + b + c);
        return Q.fcall(func, 1, 2, 3).then((result) => {
            expect(func).toHaveBeenCalledTimes(1);
            expect(func).toHaveBeenCalledWith(1, 2, 3);
            expect(result).toBe(6);
        });
    });
});