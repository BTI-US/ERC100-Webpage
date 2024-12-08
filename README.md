# ERC100 Webpage

[![Deploy static content to Pages](https://github.com/BTI-US/ERC100-Webpage/actions/workflows/static.yml/badge.svg?branch=master)](https://github.com/BTI-US/ERC100-Webpage/actions/workflows/static.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

- Last Modified: 2024-12-01
- Author: Phill Weston

## Introduction

In the current cryptocurrency market, fraud and chaos are rampant, greatly damaging investor confidence. Our project is dedicated to improving this situation through technical means, thereby restoring and enhancing user trust in the market. We propose an innovative solution that uses mathematical models to simulate and predict the most market-demanded trading curves, combined with matrix decomposition techniques to find the optimal solution, dynamically adapting to changes in market sentiment.

When the market is highly volatile and confidence is low, the system will automatically execute intelligent trading strategies to prevent a vicious cycle caused by panic selling; as market confidence gradually recovers, trading will be gradually opened to restore normal market liquidity. In this way, our project can achieve steady growth of the K-line, alleviate market volatility in a controlled manner, and create a more stable and predictable trading environment for users.

Our goal is to reduce uncertainty in trading through technological means, establish a trust-first cryptocurrency ecosystem, provide a safer and more reliable investment experience for the majority of investors, and strive to become a leader in enhancing market confidence.

## Setting Up for Mail Subscription Service

Here is the detailed step about how to configure the backend mail server for GitHub Pages (or other web services that only support frontend pages).

1. Generate HTML Mail Template (Postcards)
    
    [Postcards - Designmodo](https://designmodo.com/postcards/app/)
    
    After editing the contents, export as a ZIP file with the images and HTML files together.
    
2. Domain Email Account Registration and SMTP Server Setting
    
    [GoDaddy Webmail](https://email.godaddy.com/)
    
3. Use EmailJS for Email Backend Service
    
    Basic Setting
    
    [Send email directly from your code | EmailJS](https://www.emailjs.com/)
    
    REST API Documentation
    
    [/send API | EmailJS](https://www.emailjs.com/docs/rest-api/send/)
    
    Note: 
    
    - SMTP.js only supports elasticemail as its backend SMTP mail server, no third-party SMTP server is supported.
    - The limitation of the content body of EmailJS is no more than 50kb, be sure the size of the HTML file is less than the threshold.
    - We can use the following website to shrink the size of the HTML file by removing the unnecessary characters (like white space, etc)
        
        [HTML Compressor - Reduce the size of HTML, CSS, JavaScript, PHP and Smarty code.](https://htmlcompressor.com/compressor/)
        
4. Backblaze B2 OBS Bucket for Image Storage
    
    We need to upload the images extracted from the downloaded ZIP file to the OBS bucket and replace all of the image paths from the relative path to the HTTPS path, which can be obtained through the detailed property of the file in the OBS bucket.

## Setting Up `config.json` for Local Deployment

To successfully deploy and run the project locally, you need to create a `config.json` file in the root directory of the project. This file contains essential configuration details needed for the application to interact with the blockchain network.

### Step-by-Step Guide

1. **Create the File:**
   - In the root directory of your project, create a file named `config.json`.

2. **Add Basic Structure:**
   - Open the file in a text editor and add the following JSON structure:
     ```json
     {
         "emailToken": "Your_Email_Token",
         "emailServiceID": "Your_Email_Service_ID",
         "emailTemplate": "Your_Email_Template"
     }
     ```
   - Replace `Your_Email_Token` with the token for sending emails.
   - Replace `Your_Email_Service_ID` with the service ID for sending emails, for example: `lotso_email`.
   - Replace `Your_Email_Template` with the email template name, for example: `chubgame_email_template`.

3. **Save the File:**
   - Save your changes to `config.json`.

4. **Important Notes:**
   - The `config.json` file is crucial for the application's interaction with the blockchain. Ensure that the details are correct.
   - If you are working in a team or planning to push this code to a public repository, **do not** include sensitive information like private keys or secret tokens in the `config.json` file. Instead, use environment variables or other secure methods to handle sensitive data.

5. **.gitignore:**
   - If you are using Git, make sure to add `config.json` to your `.gitignore` file to prevent accidentally pushing it to a public repository:
     ```bash
     echo "config.json" >> .gitignore
     ```
