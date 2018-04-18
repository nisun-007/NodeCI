
const Page = require('./helpers/page');
let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('localhost:3000');
});

afterEach(async () => {
    await page.close();
});

test('the header has the correct test', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
});

test.skip('clicking logging starts oauth flow', async () => {
    await page.click('.right a');

    const url = await page.url();
   
    expect(url).toMatch(/accounts\.google\.com/);
});

test('when signed in, show logout button', async () => {

    await page.login();

    const text = await page.getContentOf('a[href="/auth/logout"]');
    expect(text).toEqual('Logout');

});