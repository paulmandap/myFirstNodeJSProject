const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Asynchronous reading of home.html for the homepage
        const homePage = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Home</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        background-color: rgb(0, 21, 51); /* Updated background color */
                        color: #ffffff; /* White text */
                        margin: 0;
                    }
                    h1 {
                        font-size: 2.5em;
                        margin-bottom: 20px;
                        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
                    }
                    .button-container {
                        display: flex; /* Use flexbox for horizontal alignment */
                        gap: 10px; /* Space between buttons */
                    }
                    button {
                        background-color: #007bff; /* Blue button */
                        color: #ffffff; /* White text */
                        border: none;
                        border-radius: 5px;
                        padding: 15px 30px;
                        font-size: 1.2em;
                        cursor: pointer;
                        transition: background-color 0.3s, transform 0.3s;
                    }
                    button:hover {
                        background-color: #0056b3; /* Darker blue on hover */
                        transform: scale(1.05); /* Slightly enlarge button */
                    }
                    button:active {
                        transform: scale(0.95); /* Slightly shrink button when clicked */
                    }
                    @media (max-width: 600px) {
                        h1 {
                            font-size: 2em; /* Responsive font size */
                        }
                        button {
                            font-size: 1em; /* Responsive button size */
                            padding: 10px 20px; /* Responsive padding */
                        }
                    }
                </style>
            </head>
            <body>
                <h1>Welcome to My Team!</h1>
                <div class="button-container">
                    <button onclick="window.location.href='/about'">About Us</button>
                    <button onclick="window.location.href='/contact'">Contact Us</button>
                    <button onclick="window.location.href='/data'">Data</button>
                </div>
            </body>
            </html>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(homePage);
        res.end();
    } else if (req.url === '/about') {
        // Asynchronous reading of about.html
        fs.readFile(path.join(__dirname, 'about.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Internal Server Error');
                return res.end();
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (req.url === '/contact') {
        // Asynchronous reading of contact.html
        fs.readFile(path.join(__dirname, 'contact.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Internal Server Error');
                return res.end();
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (req.url === '/data') {
        // Asynchronous reading of data.json and dynamic HTML generation
        fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Internal Server Error');
                return res.end();
            }

            const jsonData = JSON.parse(data);
            const html = `
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: rgb(0, 21, 51); /* Updated background color */
            color: #ffffff;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: rgba(0, 0, 0, 0.7); /* Darker background for better contrast */
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
            width: 90%; /* Make it more responsive */
            max-width: 600px; /* Limit max width */
            text-align: center; /* Center align text */
        }
        h1 {
            color: #007bff;
            margin-bottom: 20px; /* Space below heading */
            font-size: 2em; /* Responsive font size */
        }
        p {
            font-size: 1.2em;
            margin: 10px 0; /* Space between paragraphs */
        }
        .back-button {
            background-color: #007bff;
            color: #ffffff;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            font-size: 1em;
            cursor: pointer;
            margin-top: 20px; /* Space above button */
            transition: background-color 0.3s, transform 0.3s;
        }
        .back-button:hover {
            background-color: #0056b3;
            transform: scale(1.05);
        }
        .back-button:active {
            transform: scale(0.95);
        }
        @media (max-width: 600px) {
            h1 {
                font-size: 1.5em; /* Smaller heading on small screens */
            }
            p {
                font-size: 1em; /* Smaller text on small screens */
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Data Details</h1> <!-- Added a heading -->
        <p><strong>Name:</strong> ${jsonData.name}</p>
        <p><strong>Age:</strong> ${jsonData.age}</p>
        <p><strong>Email:</strong> ${jsonData.email}</p>
        <button class="back-button" onclick="window.location.href='/'">Back to Home</button>
    </div>
</body>
</html>



            `;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(html);
            res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h2>Page Not Found</h2>');
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000/');
});
