# Instructions
- Clone and rename folder `$ git clone git@github.com:dented-academy/react-basic-starter.git [your_project_name_here]`
- Find and rename all instance of `[your_project_name_here]` to your actual project name
- Run `$ npm install`
- Run `$ rm -rf .git`
- Run `$ git init`
- Create a new repo in github and add the repo ssh link to remote
- Run `$ git add .`
- Run `$ git commit -m 'init'`
- Run `$ git push origin master`
- Run `$ npm run serve`

# Deployment To Railway Through Web Interface
- Go to [Railway](https://railway.app/)
- Go to `Dashboard` and Create a new project (Select `Empty Project`)
- Add a new Service `GitHub Repo -> Select your project`
- Click on your `>_ Repo-Name -> Settings -> Environment -> Generate Domain` (This will generate a domain for your project)
- Now, whenever you push to your github repo's master branch, it will automatically deploy to Railway
