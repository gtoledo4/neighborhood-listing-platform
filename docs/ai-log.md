Gemini gave me a very simple and easy explanation of what the stack- Next.js, TypeScript, and Tailwind CSS does, how they work together, and why it is more efficient for a developer. Gemini claims TypeScript catches any logical errors before you run or publish the app, Next.js handles routing users from page to page and delivering the site efficiently, while Tailwind controls the layout, meaning what color you want the site to be and how big the font will also be.
ChatGPT's explanation was a little more complex, claiming Next.js is a framework built around React, which is hard to understand. TypeScript makes sure the code is using the correct type of information, and finally, Tailwind gives you small utility classes that help control things like borders and spacing. This eplanation like i said, reads as more complex with no simple explanation, which make it dificult to understan if you dont have any expariance.
Created the App Shell Architect prompt requesting Next.js, TypeScript, Tailwind, accessible HTML, no secrets, commands, and a file plan. Used the setup guidance and file plan to create the app shell Rejected a giant code dump and anything involving secrets. Verified the project by running the Next.js development server and checking the browser.

## Normalization review

ChatGPT EDU and Gemini were asked to identify normalization concerns with the property data model, especially the amenities field.
Both identified inconsistent amenity names and difficulty searching or filtering free-text amenities as normalization concerns. Both also identified a many-to-many Amenities/PropertyAmenities design as the most normalized approach for a relational production database.

Decision:
For the current project, amenities will remain an array of controlled string values. This keeps the JSON contract simple while preventing inconsistent free-text values. If the application later moves to a relational database with more advanced filtering or amenity metadata, amenities can be normalized into an Amenities table and a PropertyAmenities join table.
Free text may still be appropriate for optional descriptive details, but not for the standardized amenity values.