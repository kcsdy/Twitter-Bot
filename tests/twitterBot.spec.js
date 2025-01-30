// @ts-check
import { test, expect } from '@playwright/test';
import exp from 'constants';

test('Twitter Login Bot', async ({ page }) => {
  //Log In
  await page.goto('https://x.com/login');
  await page.locator("input[autocomplete='username']").fill("passenger.in.window.seat@gmail.com");
  await page.locator("input[name='text']").fill("Kc_sdy");
  await page.locator("//span[text()='Next']").click();
  await page.locator("input[name='password']").fill("Kutty@422");
  await page.locator("//span[text()='Log in']").click();

  //Accept cookies
  await page.locator("//span[text()='Accept all cookies']").click();
  await expect(page).toHaveURL('https://x.com/home');


  //Click on "Tweet button"
  
  await page.locator("a[href='/compose/post']").click();
  await expect(page).toHaveURL('https://x.com/compose/post');
  await page.waitForTimeout(2000);

  //Write a tweet
  const Tweet_text= "Testing bot 01fffasdsada";
  await page.locator("(//div[@aria-label='Post text'])[1]").fill(Tweet_text);

  //Post the tweet
  await page.locator("button[data-testid='tweetButton']").click();
  await page.waitForTimeout(2000);
  await page.locator("button[data-testid='app-bar-close']").click();

  //Search of a tweet using hastag
  await page.locator("a[href='/explore']").click();
  await expect(page).toHaveURL('https://x.com/explore');
  await page.getByPlaceholder("Search").fill("#counter-strike");
  await page.keyboard.press("Enter");
  await page.locator("//span[text()='Latest']").click();
  await page.waitForTimeout(5000);

  // Like the first 5 tweets
  const likeButtons = await page.$$("button[data-testid='like']");

  for(let i=0;i<Math.min(likeButtons.length, 5);i++)
  {
    await likeButtons[i].click();
    console.log(`Liked Tweet ${i+1}`);
    await page.waitForTimeout(2000);
  }
  console.log("Liking complete!");

  
});
