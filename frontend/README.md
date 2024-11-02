## Frontend Documentation

The organization of the frontend is fairly straightforward. 

`App.jsx` is the top level component. Within it, it calls `Menu`, which calls `Users` and `Messages`. 


Fetching the users and its callback function happens at the top level and flows down into the bottom 3 components. Message fetching only happens within the `Message` component. 

The bottom 3 components are only shown when `isAuthenticated` is confirmed by Auth0. 