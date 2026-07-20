import Q from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly implement the nodeify function', () => {
        const nodeback = jest.fn();
        Q.nodeify(Q.resolve('test'), nodeback);
        expect(nodeback).toHaveBeenCalledTimes(1);
        expect(nodeback).toHaveBeenCalledWith(null, 'test');
    });

    it('should throw an error when nodeify is not implemented', () => {
        const nodeback = jest.fn();
        Q.nodeify = function() {};
        expect(() => Q.nodeify(Q.resolve('test'), nodeback)).toThrow();
    });
});