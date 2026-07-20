const consoleSpy = jest.spyOn(console, 'log');
const originalCode = `
  if (!module.parent) {
    console.log("for testing purpose");
    //getlevel("www.domain.com/aaa/bbb/","www.domain.com/aaa/bbb/ccc");
    //let res1 = getlevel("sub.domain.com/aaa/bbb/","sub.domain.com/aaa/bbb/ccc");
    //let res2 = getlevel("sub.domain.com/aaa/bbb/ccc/ddd","sub.domain.com/aaa/bbb/ccc");
    //let res3 = getlevel("sub.domain.com/aaa/bbb/eee","sub.domain.com/aaa/bbb/ccc");
    //debugger;
    //let res = parse("ddd","http://www.stackoverflow.com/aaa/bbb/ccc/");
    //let page = 'http://journals.tubitak.gov.tr/';
    //let link = 'http://journals.tubitak.gov.tr/genel/telifhakki.pdf';
    //let res = gettype(link, page);
    //debugger
    //res = gettype(page, link);
    //debugger
    //process.exit();
    let url = "https ://www.npmjs.com/package/electron-window-manager";
    let res = parse(url);
    debugger;
  }
`;

const mutatedCode = `
  if (!module.parent) {}
`;

describe('crawler-url-parser.js', () => {
  it('should have a non-empty if (!module.parent) block', () => {
    const originalConsoleLog = console.log;
    console.log = () => {};
    eval(originalCode);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    console.log = originalConsoleLog;
    consoleSpy.mockRestore();
  });
});