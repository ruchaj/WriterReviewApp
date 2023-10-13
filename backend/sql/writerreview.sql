-- Create User Table
DROP DATABASE IF EXISTS writerreview;
CREATE DATABASE writerreview;
USE writerreview;
CREATE TABLE Author (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    timeswarned INT,
    numberofposts INT
);

-- Create Post Table
CREATE TABLE Post (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    anonymous BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES Author(user_id)
);

-- Create Review Table
CREATE TABLE Review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT,
    content TEXT NOT NULL,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    anonymous BOOLEAN,
    FOREIGN KEY (post_id) REFERENCES Post(post_id),
    FOREIGN KEY (user_id) REFERENCES Author(user_id)
);
CREATE TABLE Genre (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(255) NOT NULL
);
CREATE TABLE WritingForm (
    writing_form_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(255) NOT NULL
);
ALTER TABLE Post
ADD COLUMN writing_form_id INT,
ADD COLUMN genre_id INT,
ADD FOREIGN KEY (writing_form_id) REFERENCES WritingForm(writing_form_id),
ADD FOREIGN KEY (genre_id) REFERENCES Genre(genre_id);

-- Insert Post Types and Genres
INSERT INTO WritingForm (type_name) VALUES
    ('Poem'),
    ('Short Story'),
    ('Play'),
    ('Novel');

INSERT INTO Genre (genre_name) VALUES
    ('Mystery'),
    ('Fantasy'),
    ('Romance'),
    ('Science Fiction');

-- Insert User Data
INSERT INTO Author (username, email, password, timeswarned, numberofposts)
VALUES
    ('user1', 'user1@example.com', 'password1', 2, 5),
    ('user2', 'user2@example.com', 'password2', 0, 3),
    ('user3', 'user3@example.com', 'password3', 1, 7);

-- Insert Posts
INSERT INTO Post (user_id, title, content, writing_form_id, genre_id, anonymous)
VALUES
    (1, 'Beautiful Poem', 'This is a heartfelt poem...', 1, 3, 0),
    (2, 'Mysterious Short Story', 'In a dark and stormy night...', 2, 1, 1),
    (3, 'Fantasy Play', 'Once upon a time in a magical kingdom...', 3, 2, 0),
    (1, 'Sci-Fi Adventure', 'In the year 3023, on a distant planet...', 4, 4, 0);

-- Insert Review Data
INSERT INTO Review (post_id, user_id, content, anonymous)
VALUES
    (1, 2, 'This poem is beautifully written. Great work!', 0),
    (1, 3, 'I enjoyed reading this poem. Well done!', 1),
    (2, 1, 'Your short story kept me on the edge of my seat. Fantastic!', 0),
    (3, 2, 'I loved your play! The characters were so vivid.', 1),
    (4, 3, 'Your sci-fi adventure was captivating. I couldn''t put it down.', 0);
