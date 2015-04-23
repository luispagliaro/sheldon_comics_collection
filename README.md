## Sheldon's Comics Collection

This web application was developed for GlobantU courses. The app is a comic collection, in which Dr. Sheldon Cooper can add, modify and delete comics.

### Functionalities

- Storage: for storing the data I used local storage. For the purposes of this course, it wasn't specified how to develop the backend functionality so I thought it would be better and faster to use local storage, and also it's a feature of HTML5 which is a requirements for passing the course.

- Login/Logout: Dr. Sheldon Cooper can sign in to his account using his credentials (user: sheldon, pass: password1234). Loging in will allow you to add, modify or delete comics. This data is stored in the local storage as an MD5 encrypted string. So when when you sign in, the input text for the user and pasword are submitted and encrypted to MD5, if the encrypted string matches the string stored in local storage, it grants access. Since the data is stored in local storage, there is not much security and it is not recommended to store user data in local storage, but for functionality purposes I decided to do it this way.

- Search comics: it is possible to search for a comic by typing its name in the 'Search comic' input. A list of comics names that match the text in the input will be displayed when typing. Then, when clicking a comic from this list, the only displayed comic will be the one clicked. When erasing the input text in the 'Search comic' input all the comics will be displayed.

- Filter comics by genre: by default the option 'Show all' it's checked. But it is possible to filter comics by genres just by clicking the 'Filter by genre' dropdown and then selecting a genre.

- Comics display: the comics are all displayed in the main page. We can see information related to them like name, genre, quantity, a picture, a description, also see a image and video gallery, and share it in facebook.

- Adding, modifying and deleting comics: when adding a comic you have to input name, genre (here you have the option to add a new genre), description, quantity, the youtube videos URL (one per line, example: https://www.youtube.com/watch?v=hbPaaXGAGkg), and  the images to be submitted, all the fields are required. When modifying a comic, the same fields are required, to change the current images you have to check the 'Change images' checkbox in order to enable the image input. To delete a comic just click the delete icon that appears when hovering a comic.