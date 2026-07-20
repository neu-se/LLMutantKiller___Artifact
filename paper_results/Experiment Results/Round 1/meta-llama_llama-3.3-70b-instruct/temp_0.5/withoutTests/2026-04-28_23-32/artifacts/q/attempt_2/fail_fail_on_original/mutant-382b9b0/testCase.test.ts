import { Q } from "../../../../../q";

describe('Q', () => {
    it('should call the nodeback with the correct arguments when nodeify is used', () => {
        const nodeback = jest.fn();
        const promise = Q.resolve('test');
        const originalNodeify = Q.nodeify;
        Q.nodeify = function(object, nodeback) {
            return Q(object).nodeify(nodeback);
        };
        promise.nodeify(nodeback);
        expect(nodeback).toHaveBeenCalledTimes(1);
        expect(nodeback).toHaveBeenCalledWith(null, 'test');
        Q.nodeify = originalNodeify;
    });
});