# Primal Poetry

Inspired by [Poetry for Neanderthals](https://www.explodingkittens.com/products/poetry-for-neanderthals)

## Play

Play it here: [https://yodigi7.github.io/primal-poetry/](https://yodigi7.github.io/primal-poetry/)

## How to Play

[![YouTube Video how to play](https://img.youtube.com/vi/hpbqepbvoJ8/0.jpg)](https://www.youtube.com/watch?v=hpbqepbvoJ8)

## Project Explained

This is a SvelteKit project built to play on a single device.
It automates the shuffling of the deck of cards with the words and keeps track of the timer and all of the other game mechanics.

It uses sessionStorage to save the game state in-case a user accidentally refreshes the page or closes the window.
I also set it up to be a PWA so it more seamlessly integrates with the mobile experience.

It is currently optimized visually for mobile first as that is the anticipated device it would be played on.

## Future Possibilities

It would be good to setup a way to have multiple devices synced to one game.
This would allow for the opposing team to NO a card when a rule was broken.
It would allow for the game to be played over the internet if needed rather than only in person.

## Deploy to Github Pages

`pnpm run deploy`
