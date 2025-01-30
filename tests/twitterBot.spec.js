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

  //Write a tweet
  const Tweet_text= "A new start";
  await page.locator("(//div[@aria-label='Post text'])[1]").fill(Tweet_text);

  //Post the tweet
  await page.locator("button[data-testid='tweetButton']").click();
  await page.locator("button[data-testid='app-bar-close']").click();
  
});
