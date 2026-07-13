# Let's make the API for a Food Trucks App together! 🚛

We will work as a team of developers to create the API for a Food Trucks App. 

Each developer will code and test their assigned API endpoint & helper function. 

Check out the `api-documentation.md` file for the assigned tasks. 

## **Learning Goals**

By doing this activity together, we will practice...

- Making and merging Git branches
- Submitting, reviewing, and approving Pull Requests
- Collaborating with a team of developers
- Building API Endpoints with Node, Express & SQL

## Resources

1. [Learn Git Branching Interactive Tutorial](https://learngitbranching.js.org/)
2. [Github Skills](https://skills.github.com/)
3. [git - the simple guide](https://rogerdudler.github.io/git-guide/)

---

## Instructions

---

### 🛠️ 1. Forking and Cloning this Github repo

1. Fork this Repository to make a copy into your Github account by selecting the 'Fork' button
   <img width="707" alt="Screenshot of Github repo with Fork button" src="https://github.com/user-attachments/assets/0f6a1ddf-60d2-4e63-859c-b84bfaafacde" />

2. Confirm you forked the repo. At the top of the repo's page, instead of `ac-backend` like in the below screenshot, you should see your own Github username followed by the name of the repo.

<img width="1201" alt="Screenshot showing the name of the repo and the username that owns the repo" src="https://github.com/user-attachments/assets/ed4dab00-fc78-4fd4-afd9-0283f2f62254" />

3. Clone the Repository into your local machine
   - Go to your Github repo's page on GitHub. Click on the green “Code” button and copy the repo's URL

     ![image](https://github.com/user-attachments/assets/fd6fcf7f-9246-42da-80be-0c4d75c3f48a)
   - Open the Terminal
   - `cd` to into your `dev` folder, which is where you want to clone the repo
   - Type `git clone YOUR_REPO_URL` , replacing `YOUR_REPO_URL` with your Github repo link that you copied
   - Press Enter to run the command. Now you’ve cloned your Github repo! 🎉
  
---

### 🛠️ 2. Project Setup: Adding the `config.js` file`node_modules` folder 

1. **Create the `config.js` file** 

   In the `server/src` folder, create a `config.js` file. Your instructor will provide you with code that you will copy and paste into this file, which will contain the access credentials to the Food Trucks database that's already hosted on Neon.

---

### 🛠️ 3. Project Setup: Generating the `node_modules` folder in the `server` folder

1. In the terminal, `cd` into your `server` folder.

2. Run `npm install` to generate the `node_modules` folder. This command tells Node to look in the `package.json` file, find the list of dependencies, and install all of them into the `node_modules` folder.

---

### 🛠️ 4. Making a new branch in your Github repo

1. Create a branch called “new-feature”

   ```bash
   git checkout -b new-feature
   ```

2. Verify the branch was created successfully:

   ```bash
   git branch
   ```

   - This command will open up a lightweight text editor called LESS, which is an application that lives within the terminal.
   - To exit LESS and go back to the command line, press the `q` key on your keyboard. You may have to press `q` multiple times.

3. Make sure you’ve switched to your new branch on VS Code
   - In the bottom left corner of VS Code, you should see the name of your new branch “new-feature”. This indicates that you have switched to your new branch on VS Code.
   - If it says “main” instead of “new-feature”, that means you are currently on the main branch. Click on the branch name to switch the branch you’re on in VS Code.
   - From now on, you should always check which branch you’re in before you write any code — you don’t want to accidentally write code in the wrong branch! Generally, you only write code in a feature branch or a develop branch, never in the main branch.

---

### 🛠️ 5. Edit the index.js file in your `new-feature` branch

1. You have been assigned an API endpoint. Your task is to:
   - Complete the API endpoint (with either `app.get()` or `app.post()`
   - Complete its helper function
   - Test it in Postman and confirm it works according to the API documentation.

2. Once you have completed your new feature locally, commit your changes and push to your branch.

   ```bash
   git add .
   git commit -m "Added my assigned API endpoint and helper function, which I tested and confirmed it worked"
   git push origin new-feature
   ```

---

### 🛠️ 6. Merging the new-feature branch into your main branch

1.  **Switch to the Target Branch (e.g., `main`)**

    Run the following command to switch to the branch you want to merge into:

          git checkout main

2.  **Update the Target Branch**

    Make sure your `main` branch is up-to-date with the latest changes from the remote:

          git pull origin main

3.  **Merge the Specified Branch into the Current branch**

          git merge new-feature --no-edit
    
    If this command takes you to a strange window in the Terminal where you can't type anything, don't panic! This is called Vim, a text editor that lives on the command line. You can exit back to the normal command line by typing `:wq`.
4.  **Push the Merged Changes to the Remote Repository**

    After a successful merge, push the updated `main` branch to GitHub:

          git push origin main

---

### 🛠️ 7. Submit a Pull Request (PR)

In order to have your code accepted back into the original repo, you'll need to submit a pull request.

1. Open **your** repository on the Github website
2. Click on the Pull Requests tab
3. Start a New Pull Request
4. Select the Branches to Compare
5. Review the Changes:
   - GitHub will display a summary of the changes.
   - Ensure the listed changes match your expectations.
6. Add a Title and Description:
   - Write a descriptive title (e.g., “Added new feature”).
   - Provide a detailed description of the changes, including:
     - The purpose of the changes.
     - Any key features or fixes.
     - Any dependencies or testing instructions.
7. Submit the Pull Request:
   - Click the **Create Pull Request** button.

---

### 🛠️ 8. Review, Provide Feedback, and Accept another person's Pull Request

1. Review one other person's pull request and look at their code that they want to merge into the main branch. [The Github documentation on pull requests will help you do this.](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/approving-a-pull-request-with-required-reviews)
2. Add a comment to their pull request and provide feedback about their proposed changes. This is an opportunity to practice talking about code and giving respectful and constructive feedback: if you notice something cool or admirable, tell them! Or if you notice something they can improve or something they should fix before the pull request can be approved, let them know.
3. If their code looks good to you, approve their pull request so that their code can be merged.

---

### 🛠️ If you get a merge conflict error

Congrats on encountering your very first merge conflict error! 🎉 [Check out this article to see how you can resolve it](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github)!

---

## 🛠️ Recap

Let’s review what we did in this workshop:

- Fork - Make a copy of a remote repo to another remote repo
- Clone - Make a copy of a remote repo to our local machine
- Branch checkout - Create a new branch, allows us to work on our entire project in a separate workstream
- Add, Commit + Push our changes to our `new-feature` branch
- Switch back into the `main` branch
- Pull the code on the `main` branch to make sure we are all up to date
- Merged `new-feature` branch code into `main` branch
- Push `main` branch changes to remote repo
- Submitted a pull request to have code accepted back into original repo. Someone else will review our pull request.
- Review and add comments/feedback to someone else's pull request
- Approved and merged someone else's pull request

---

# Next Step: Build the Frontend

Once you've finished your assigned API endpoint and helper function, gotten it approved and merged into the shared codebase, you're ready to start building the frontend of the Food Trucks App!

## Your Task

- Review the existing code in the client folder.
- Render all food truck data on the Home page. Style it as a grid of cards.
- Display a total count of food trucks at the top of the page.

<img width="1000" alt="Example of Food Trucks App frontend" src="https://github.com/user-attachments/assets/65b6aff0-566c-4e85-b774-e3e4c3b9343e" />

## Stretch Goals 🌟

Finished? Try one of these bonus challenges!

1. 🌟 Add a delete button to each food on the Home page
2. 🌟 Show a "Top Rated" badge on trucks with rating >= 4.5.
3. 🌟 Add a sort feature on the frontend for price level or rating.
4. 🌟 Add a search bar to find a food truck by name.
5. 🌟 Show the food truck's rating as stars. For example, a rating of 4 would show as ⭐️⭐️⭐️⭐️.
6. 🌟 Show the food truck's price level as dollar signs. For example, a price level of 3 would show as `$$$`.
