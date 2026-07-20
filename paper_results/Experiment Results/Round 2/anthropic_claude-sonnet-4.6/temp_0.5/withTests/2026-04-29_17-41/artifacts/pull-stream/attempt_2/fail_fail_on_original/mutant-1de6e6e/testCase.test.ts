describe('reduce without initial value', () => {
  it('should propagate error to callback when source errors on first read with no initial value', (done) => {
    const testError = new Error('source error')
    
    const errorSource = (_abort: any, cb: Function) => {
      cb(testError)
    }
    
    const through = reduce(
      (acc: any, data: any) => data,
      (err: any, _result: any) => {
        expect(err).toBe(testError)
        done()
      }
    )
    
    through(errorSource)
  })
})