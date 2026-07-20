import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly implement the nodeify function', () => {
        const nodeback = jest.fn();
        const promise = Q.resolve('test');
        Q.nodeify(promise, nodeback);
        expect(nodeback).toHaveBeenCalledTimes(1);
        expect(nodeback).toHaveBeenCalledWith(null, 'test');
    });
});