# PGT-10-Secure-Web-Blog
CW2 for 'Developing Secure Software' where we have to develop a secure Web-Blog that is protected from Common Web Vulnerabilities

We will be using the **Express** Node Framework for this site.

## Objective
To code and secure the web-based blog using JavaScript and Node.js, with a PostgreSQL database.

## Requirement
- Registration and Login authentication
- search functionality
- ability to add, edit and delete posts

At a minimum, your code should defend against the five most common vulnerabilities of:
- Account enumeration
- Session hijacking
- SQL injection
- Cross-site scripting
- Cross-site request forgery

## Additional Information and Considerations

Need to only concentrate on coding the security aspects of the web-based blog and not web development, as you only need to produce a basic usable front-end.

You also need to consider privacy and ethics when coding your system.

Additional marks will be available for groups that mitigate other potential vulnerabilities and/or attacks, alongside ensuring the blog remains usable throughout.

You can use pre-built security libraries, but you must clearly and concisely explain how they work, what they secure against and exactly how they provide security protection, during the demo and in your client report.

**There are, however, more marks available for coding your own security processes/algorithms.**

Each mitigation must remain valid throughout the website, e.g., you cannot mitigate SQL injection and then break it later when mitigating another vulnerability.

## Repo Setup Guides and Resources

### Creating a local version of the Database used by the site:
<iframe width="560" height="315" src="https://www.youtube.com/embed/WwcUuguOZlw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Software/Tools Required:
- [node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/package/npm)
    - #### Modules:
        - [Express](https://expressjs.com/)
        - [body-parser](https://www.npmjs.com/package/body-parser)
        - [pg (PostgreSQL DB Module)](https://www.npmjs.com/package/pg)
- [PostgreSQL](https://www.postgresql.org/download/)
- [PostgreSQL (alt download)](https://www.enterprisedb.com/postgresql-tutorial-resources-training?uuid=4726a163-a071-4af4-8395-6d239c34d4a1&campaignId=7012J000001h3GiQAI)