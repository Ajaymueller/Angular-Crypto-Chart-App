# Crypto-Chart-App

Author: Aidan Mueller

## The brief 

The aim of this project was to create a simple web application using Angular that retrieves data from the Crypto Compare API and manipulates that data to create a line chart. 

## The approach 

This was my first project I have built using Angular, TypeScript, and D3 so these technologies were a little unfamiliar to me at first. Taking the project brief step-by-step, my main aim was to get the project working rather than looking amazing, I knew I could do that later on. Firstly, I had to use HttpClient in order to do an API request, so this was imported and models and a service were also created as I could then inject the getMethod into the component via the service. Once I had the data, then I was able to use D3 to create 2 line charts using that data, one showing the historical price of Bitcoin, the other showing Ethereum. After that, I was able to add a little functionality to it by adding a few buttons with the option to view both charts, or just one. 

## Tools Used

- TypeScript
- Angular version 11.1.2
- D3.js

## What more could I have done

I would like to have implemented some unit tests using Jasmine and Karma. The testing package that I am most familiar with is Jest, so this would also be new to me. I also would have liked to style the application more, and to perhaps enhance the usability and functionality of it. For example, I could have used a D3 transition when the graph changes from Bitcoin to Ethereum, and vice versa or I could I have implemented a tooltip that shows the price when the mouse hovers over the line chart. Also, I think I can make the app more mobile friendly. In addition to this, I could probably have created another service to store the logic of D3, then inject it into the component. I will bear this in mind for future projects.  
Lastly, I will definitely want to deploy this in the future using a personal GitLab server that I have access to. I did try to deploy it but faced some problems with the server that will need correcting at a later date. Altogether, this was an enjoyable project and I definitely feel more comfortable using D3 and Angular now. I fully intend to continue my learning with these technologies. 



