import { Q } from "./q";

describe('Q', () => {
    it('should correctly implement the nodeify function', () => {
        const nodeback = jest.fn();
        Q.nodeify(Q.resolve('test'), nodeback);
        expect(nodeback).toHaveBeenCalledTimes(1);
        expect(nodeback).toHaveBeenCalledWith(null, 'test');
    });
});