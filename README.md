## Sheldon's Comics Collection

This web application was developed for GlobantU courses. The app is a comic collection, in which Dr. Sheldon Cooper can add, modify and delete comics.

### Functionalities

To see the web live, go to: www.matvey.com.ar/comics/index.html (to use the Facebook share is it necessary to go to this page since Facebook share doesn't work in local).

- Storage: for storing the data I used local storage. For the purposes of this course, it wasn't specified how to develop the backend functionality so I thought it would be better and faster to use local storage, and also it's a feature of HTML5 which is a requirements for passing the course.

- Login/Logout: Dr. Sheldon Cooper can sign in to his account using his credentials (user: sheldon, pass: password1234). Loging in will allow you to add, modify or delete comics. This data is stored in local storage as an MD5 encrypted string. So when when you sign in, the input text for the user and pasword are submitted and encrypted to MD5, if the encrypted string matches the string stored in local storage, it grants access. Since the data is stored in local storage, there is not much security and it is not recommended to store user data in local storage, but for functionality purposes I decided to do it this way.

- Search comics: it is possible to search for a comic by typing its name in the 'Search comic' input. A list of comics names that match the text in the input will be displayed when typing. Then, when clicking a comic from this list, the only displayed comic will be the one clicked. When erasing the input text in the 'Search comic' input all the comics will be displayed.

- Filter comics by genre: by default the option 'Show all' it's checked. But it is possible to filter comics by genre just by clicking the 'Filter by genre' dropdown and then selecting a genre.

- Comics display: the comics are all displayed in the main page. We can see information related to them like name, genre, quantity, a picture, a description, also see an image and a video gallery, and share it on facebook.

- Adding, modifying and deleting comics: when adding a comic you have to input the name, genre (here you have the option to add a new genre), description, quantity, the youtube videos URL (one per line, example: https://www.youtube.com/watch?v=hbPaaXGAGkg), and the images to be submitted, all the fields are required. When modifying a comic, the same fields are required, to change the current images you have to check the 'Change images' checkbox in order to enable the image input. To delete a comic just click the delete icon that appears when hovering a comic.

### Other features

- When loging in and out a sound will be played and a welcoming or farewell message will be displayed.

- When filtering, adding or deleting comics a fade effect will be shown.

- When adding or modifying a comic, if there is an invalid input in the form, a red border will be displayed around the input, and below it a message with the error. If there are no errors, a green border will be displayed around the input.

- If the name of the comic has more than 20 characters ... will be displayed, and when hovering the mouse a tip will be displayed showing the complete name of the comic.

- Regular expression to validate YouTube URLs.

- Responsive design. For break points smaller than 768px wide the menu will change. A hamburguer icon will be displayed containing all the options of the navigation menu.

- The images are stored as DataURL.

### Techonologies and libraries used

- HTML5
- jQuery
- JavaScript
- CSS3
- Bootstrap
- jQuery UI
- jQuery BlueImp Gallery
- Facebook API
- MD5