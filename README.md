## Instructions

In order to run the application, [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/download/) must be installed.

```
# Clone the repository
git clone https://github.com/rayrayyn/neuroflow-frontend-assessment

# Go into the repository
cd neuroflow-frontend-assessment

# Install the dependencies
npm install

# Start the Application (Development)
npm run dev

# Open the Application
Visit http://localhost:3000/ in your browser
```

## Summary

In my project, I chose to use Javascript with React and Next.js. I used Next.js because one of the requirements asked for the page and/or table to not display until the API call was completed and Next.js supports server-side rendering. Taking advantage of this feature, we can fetch the api, populate the table with data, and then send it back to the client. Next.js also comes with API routes built-in so I put the albums data in /api/table. Because I used Next.js, I have to use React which allows me to repurpose components like the table component and it is an overall better frontend development experience. I also used styled-components, which makes it easy to organize css (unnecessary for this project).
