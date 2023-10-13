Capstone Proposals

1. Problem Statement
Writing is a fairly common activity, a passion shared throughout the world. However, sharing said stories with the world can be very difficult, especially when you don't know who's on the other side of the screen.

3. Technical Solution
Create an application to allow authors to share excerpts anonymously, as well as give feedback to other authors.

Scenario 1
Aarya is a poet who's never shared her poems with the world. She wants to workshop her poems without anyone knowing its her. She uses WriterReview to get feedback on her poems, in hope that she can publish them to a literary magazine one day.

Scenario 2
Layla is a short story writer who wants to turn her story into a longer novel. Layla uses WriterReview to get advice on what parts of the story would best work as a novel.

3. Glossary

Author
The primary user of the website. Terminology applies to both the reviewers and the posters.

Post
A specific excerpt shared by an author. Has to be tied to a author, but identity is never shared. Contains distinguishing genre and writing form tags, as well as a review section. All authors must post one post to be able to review.

Writing Form
The specific type of writing that the excerpt falls under. Must be a story, short story, play or poem.

Genre
The category that the writing falls under.

Admin
The highest authority on the website. Removes posts/reviews for improper language and bans users if they've exceeded the warning system.

4. High Level Requirement
Briefly describe what each user role/authority can do. (These are user stories.)

Create a post (author)
Write a review (author)
Report post (author)
Report reviews (author)

Review posts (admin)
Review reviews (admin)
Warn users (admin)
Ban users (admin)

5. User stories

1. As an author, I would like to create posts, so I can share my writing with the world.

2. As an author, I would like to leave reviews for posts, so I can provide feedback to other authors.

3. As an author, I would like to report posts, so I can avoid those that breach the safe space of the website.

4. As an author, I would like to report reviews, so I can avoid those that breach the safe space of the website.

5. As an admin, I would like to review posts, so I can remove any that breaches the safe space of the website.

6. As an admin, I would like to review reviews, so I can remove any that breaches the safe space of the website.

7. As an admin, I would like to warn users, so I can keep track of those who've had their posts/reviews removed for unsafe space violations.

8. As an admin, I would like to ban users, so I can remove those who've been warned too many times for unsafe space violations.

TASK BREAKDOWN (subject to change, depending on how long each task takes): 
Day 1-2: Create the database and models
Day 3-4: Create JDBC template and service
Day 5-6: Springboot and testing
Day 7-8: Springboot continued, Build Genre and WritingForm components
Day 9-10: Build Post and Review components
Day 11-12: Login functionality
Day 13-14: Final revisions

TECHNOLOGY I PLAN TO USE: 
Quill.js - most likely, as it will allow me to add RTE to the post making
Passport.js - possibly, to add SSO or simplify login
Lombock - likely, to help with model making

