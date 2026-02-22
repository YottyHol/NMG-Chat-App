# Solution Explanation

## Approach

Firstly I set up the project and library, gitignore, prettier and tailwind then created the architectural structure to work with, which meant creating a feature space for the components and breaking out the logic into those components, this means any business logic can be handled at the top level, currently this is just the main page but could be split into a service or a hook.

I then did a bit of playtesting of design and accessibility by using the app myself, adding different numbers of messages this can be seen here: https://github.com/YottyHol/NMG-Chat-App/commit/5fb06c3018dcbfb37f87c7247cccb1075facf424.

Then I extended out into more complex logic and less fundamental requirements, retry logic, mobile considerations and then an example of how I would start the testing suite.

## Key Decisions

I kept the retry logic on the message bubble rather than the chat box, so that the contents on that message could be replayed.

I kept types files (one component/feature level one domain level) for managing the expected contracts and the expectation of use i.e user and assistant messages - this allows it to be extended further.

## Trade-offs

I kept all the state and api logic on page.tsx, prioritised component structure over logic structure.

## What I Would Improve With More Time

I would like to have generic Error Classes, where errors can be passed up the stack and differentiate between different network errors API validation etc.

I would like to split out the chat logic (send, retry and callbacks), probably into it's own custom hook.

I'd like to improve the focus behaviour, I feel the chat history should scroll behind the chat box and perhaps the chat should be higher up the page.

## Assumptions

The conversation is a single session that does not need to store chat history locally or server side, the placeholder of conversationId reflects this.

## Time Spent

4-5 hours, I don't know Next.js so I spent a bit of time reading the docs and getting used to the structure.
