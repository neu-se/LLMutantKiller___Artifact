import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should call the nodeback with the correct arguments when nodeify is used', () => {
        const nodeback = jest.fn();
        const promise = Q.resolve('test');
        promise.nodeify(nodeback);
        expect(nodeback).toHaveBeenCalledTimes(1);
        expect(nodeback).toHaveBeenCalledWith(null, 'test');
    });
});