import { Selector } from 'testcafe';

fixture('cookies').page(`localhost:5000`);


test('Cookies should be proxied in failure responses', async (t) => {
  const okButton = Selector('[data-e2e-type="200-button"]');
  const failButton = Selector('[data-e2e-type="403-button"]');
  const okDiv = Selector('[data-e2e-type="200-div"]');
  const failDiv = Selector('[data-e2e-type="403-div"]');
  await t.click(okButton);
  await t.wait(1000);
  const okDivSnapshot = await okDiv();
  const okExists = okDivSnapshot.innerText.indexOf('okCookie=ok') !== -1;
  await t.expect(okExists).ok('okCookie was not found');
  await t.click(failButton);
  await t.wait(1000);
  const failDivSnapshot = await failDiv();
  const failExists = failDivSnapshot.innerText.indexOf('failCookie=fail') !== -1;
  await t.expect(failExists).ok('failCookie was not found');
});
