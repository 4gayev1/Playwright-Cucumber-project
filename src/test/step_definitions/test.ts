import { Given, When, Then, fixture, getElement, expect } from "../../helper/imports/commons"

Given(`User is on {string} page`, async (url: string) => {
  await fixture.page.goto(url);
});

When(`User types {string} in {string}`, async (text: string, input: string) => {
  await getElement(input).fill(text);
});

When(`User clicks {string}`, async (element: string) => {
  await getElement(element).click();
});

When(`User waits {int} seconds`, async (sec: number) => {
  await fixture.page.waitForTimeout(sec);
});

Then(
  `{string} should have {string} text`,
  async (actualText: string, expectedText: string) => {
      await expect(getElement(actualText)).toHaveText(expectedText)
      },
);
