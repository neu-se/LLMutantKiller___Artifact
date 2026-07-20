import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly implement the nodeify method', () => {
        const nodeback = jest.fn();
        const promise = Q.resolve('test');
        Q.nodeify(promise, nodeback);
        expect(nodeback).toHaveBeenCalledTimes(1);
        expect(nodeback).toHaveBeenCalledWith(null, 'test');
    });

    it('should throw an error when nodeify is not implemented', () => {
        const nodeback = jest.fn();
        const promise = Q.resolve('test');
        Q.nodeify = function() {};
        expect(() => promise.nodeify(nodeback)).toThrow();
    });
});