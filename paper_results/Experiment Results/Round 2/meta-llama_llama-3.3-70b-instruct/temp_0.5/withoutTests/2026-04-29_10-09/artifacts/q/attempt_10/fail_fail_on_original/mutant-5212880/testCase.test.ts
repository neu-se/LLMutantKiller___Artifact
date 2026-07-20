describe('Q', () => {
    it('should call the done method correctly and fail when not called', () => {
        const Q = {
            resolve: () => {
                return {
                    then: (fulfilled: any) => {
                        fulfilled();
                    }
                };
            },
            done: (object: any, fulfilled: any, rejected: any, progress: any) => {
                object.then(fulfilled, rejected, progress);
            }
        };

        const object = Q.resolve('test');
        const fulfilled = jest.fn();
        const rejected = jest.fn();
        const progress = jest.fn();

        Q.done(object, fulfilled, rejected, progress);

        expect(fulfilled).toHaveBeenCalledTimes(1);
        expect(rejected).toHaveBeenCalledTimes(0);
        expect(progress).toHaveBeenCalledTimes(0);

        // Test that it fails when not called correctly
        const originalDone = Q.done;
        Q.done = () => {};
        expect(() => Q.done(object, fulfilled, rejected, progress)).toThrowError();
        Q.done = originalDone;
    });
});